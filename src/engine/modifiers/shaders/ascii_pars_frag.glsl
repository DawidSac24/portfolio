uniform float uCharSize;
uniform vec3 uColorDark;
uniform vec3 uColorLight;

// New Hover Uniforms
uniform vec3 uHoverColor;
uniform vec2 uMouseUv;
uniform float uHoverRadius;

float character(int n, vec2 p) {
    p = floor(p * vec2(-4.0, 4.0) + 2.5);
    if(clamp(p.x, 0.0, 4.0) == p.x) {
        if(clamp(p.y, 0.0, 4.0) == p.y) {
            int a = int(round(p.x) + 5.0 * round(p.y));
            if(((n >> a) & 1) == 1) return 1.0;
        }
    }
    return 0.0;
}