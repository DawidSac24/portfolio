uniform sampler2D tDiffuse;
uniform vec2 u_mouse_uv;
uniform float u_scramble;
uniform float u_opacity; // 1.0 = Full effect, 0.0 = Original texture

varying vec2 vUv;

void main() {
    // 1. Get the original texture color
    vec4 originalColor = texture2D(tDiffuse, vUv);

    // 2. Calculate distance from mouse
    float dist = distance(vUv, u_mouse_uv);
    
    // 3. Pixelation / Ascii grid effect
    // We break the UVs into chunks (e.g., 50x50 grid)
    float gridRes = 50.0;
    vec2 pixelUv = floor(vUv * gridRes) / gridRes;
    
    // Scramble logic: If close to mouse and scramble is active, shift the pixel UVs randomly
    if (dist < 0.15) {
        // Simple pseudo-random noise based on UVs and scramble intensity
        float noise = fract(sin(dot(pixelUv, vec2(12.9898, 78.233))) * 43758.5453);
        pixelUv += (noise * 0.1 * u_scramble);
    }
    
    // 4. Sample the color at the pixelated coordinate
    vec4 asciiColor = texture2D(tDiffuse, pixelUv);
    
    // Add a terminal-green tint to the effect
    asciiColor.rgb *= vec3(0.5, 1.5, 0.5); 
    
    // 5. Blend between the crazy ASCII effect and the original model based on opacity
    gl_FragColor = mix(originalColor, asciiColor, u_opacity);
}