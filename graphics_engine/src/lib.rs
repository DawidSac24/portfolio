use wasm_bindgen::prelude::*;
use web_sys::HtmlCanvasElement;

#[wasm_bindgen]
pub async fn start_wgpu_engine(canvas_id: String) -> Result<(), JsValue> {
    // 1. Traverse DOM and grab the Canvas (Same as before)
    let window = web_sys::window().expect("No window");
    let document = window.document().expect("No document");
    let canvas = document
        .get_element_by_id(&canvas_id)
        .expect("Canvas not found")
        .dyn_into::<HtmlCanvasElement>()?;

    // Get the actual width and height of the canvas to configure the GPU surface
    let width = canvas.width();
    let height = canvas.height();

    // 2. Initialize WGPU
    // The Instance is the entry point to WebGPU.
    let instance = wgpu::Instance::default();

    // Create a surface, which represents the HTML canvas on the screen.
let surface = instance.create_surface(wgpu::SurfaceTarget::Canvas(canvas)).unwrap();

    // The Adapter represents the physical graphics card (or the browser's software fallback).
    let adapter = instance
        .request_adapter(&wgpu::RequestAdapterOptions {
            power_preference: wgpu::PowerPreference::HighPerformance,
            compatible_surface: Some(&surface),
            force_fallback_adapter: false,
        })
        .await
        .expect("Failed to find an appropriate adapter");

    // The Device is the logical connection to the GPU (used to create resources).
    // The Queue is how we send commands to the GPU.
    let (device, queue) = adapter
        .request_device(
            &wgpu::DeviceDescriptor {
                label: None,
                required_features: wgpu::Features::empty(),
                required_limits: wgpu::Limits::downlevel_webgl2_defaults(), // Safe limits for the web
            },
            None,
        )
        .await
        .expect("Failed to create device");

    // Configure the surface to match the canvas size and the display's preferred color format.
    let surface_caps = surface.get_capabilities(&adapter);
    let surface_format = surface_caps.formats[0]; // Usually BGRA8Unorm on the web
    let config = wgpu::SurfaceConfiguration {
        usage: wgpu::TextureUsages::RENDER_ATTACHMENT,
        format: surface_format,
        width,
        height,
        present_mode: wgpu::PresentMode::Fifo, // V-Sync enabled
        alpha_mode: surface_caps.alpha_modes[0],
        view_formats: vec![],
        desired_maximum_frame_latency: 2,
    };
    surface.configure(&device, &config);

    // 3. Write the WGSL Shader
    // Notice how we define the 3 points of the triangle directly in a WGSL array.
    let shader = device.create_shader_module(wgpu::ShaderModuleDescriptor {
        label: Some("Triangle Shader"),
        source: wgpu::ShaderSource::Wgsl(std::borrow::Cow::Borrowed(r#"
            @vertex
            fn vs_main(@builtin(vertex_index) in_vertex_index: u32) -> @builtin(position) vec4<f32> {
                var pos = array<vec2<f32>, 3>(
                    vec2<f32>(0.0, 0.5),      // Top
                    vec2<f32>(-0.5, -0.5),    // Bottom Left
                    vec2<f32>(0.5, -0.5)      // Bottom Right
                );
                return vec4<f32>(pos[in_vertex_index], 0.0, 1.0);
            }

            @fragment
            fn fs_main() -> @location(0) vec4<f32> {
                // Return TUI Amber Color
                return vec4<f32>(0.96, 0.62, 0.04, 1.0); 
            }
        "#)),
    });

    // 4. Create the Render Pipeline
    // This bakes all the state into one immutable object. No more state-machine bugs.
    let render_pipeline_layout = device.create_pipeline_layout(&wgpu::PipelineLayoutDescriptor {
        label: Some("Render Pipeline Layout"),
        bind_group_layouts: &[],
        push_constant_ranges: &[],
    });

let render_pipeline = device.create_render_pipeline(&wgpu::RenderPipelineDescriptor {
        label: Some("Render Pipeline"),
        layout: Some(&render_pipeline_layout),
        vertex: wgpu::VertexState {
            module: &shader,
            entry_point: "vs_main",
            buffers: &[], 
            compilation_options: wgpu::PipelineCompilationOptions::default(), // <-- Added this
        },
        fragment: Some(wgpu::FragmentState {
            module: &shader,
            entry_point: "fs_main",
            targets: &[Some(wgpu::ColorTargetState {
                format: config.format,
                blend: Some(wgpu::BlendState::REPLACE),
                write_mask: wgpu::ColorWrites::ALL,
            })],
            compilation_options: wgpu::PipelineCompilationOptions::default(), // <-- Added this
        }),
        primitive: wgpu::PrimitiveState::default(),
        depth_stencil: None,
        multisample: wgpu::MultisampleState::default(),
        multiview: None,
    });

    // 5. Execute the Draw Call
    let frame = surface.get_current_texture().expect("Failed to acquire next swap chain texture");
    let view = frame.texture.create_view(&wgpu::TextureViewDescriptor::default());

    // An encoder collects all our GPU commands into a single batch
    let mut encoder = device.create_command_encoder(&wgpu::CommandEncoderDescriptor { label: Some("Render Encoder") });

    {
        // Start a render pass to clear the screen to black and draw the triangle
        let mut render_pass = encoder.begin_render_pass(&wgpu::RenderPassDescriptor {
            label: Some("Render Pass"),
            color_attachments: &[Some(wgpu::RenderPassColorAttachment {
                view: &view,
                resolve_target: None,
                ops: wgpu::Operations {
                    load: wgpu::LoadOp::Clear(wgpu::Color { r: 0.05, g: 0.05, b: 0.05, a: 1.0 }), // Dark grey TUI background
                    store: wgpu::StoreOp::Store,
                },
            })],
            depth_stencil_attachment: None,
            timestamp_writes: None,
            occlusion_query_set: None,
        });

        render_pass.set_pipeline(&render_pipeline);
        render_pass.draw(0..3, 0..1); // Draw 3 vertices, 1 instance
    } // Render pass borrows `encoder` mutably, so we drop it here by scoping it with {}

    // Submit the command buffer to the GPU and tell the surface to present it to the screen
    queue.submit(std::iter::once(encoder.finish()));
    frame.present();

    Ok(())
}