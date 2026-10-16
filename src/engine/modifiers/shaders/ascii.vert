// /src/engine/modifiers/shaders/ascii.vert
uniform mat3 uUvTransform;

out vec2 vUv;

void main() {
    // Multiply the raw UVs by the texture's built-in matrix (fixes flips, offsets, and scales)
    vUv = (uUvTransform * vec3(uv, 1.0)).xy;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}