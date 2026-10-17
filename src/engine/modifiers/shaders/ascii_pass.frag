// /src/engine/modifiers/shaders/ascii_pass.frag
uniform sampler2D tDiffuse;
uniform vec2 uResolution;
uniform float uCharSize;
uniform vec3 uColorDark;
uniform vec3 uColorLight;
uniform vec3 uHoverColor;
uniform vec2 uMouseScreen;
uniform float uHoverRadius;
uniform bool uUseOriginalColor;
uniform bool uUseHover;

varying vec2 vUv;

float character(int n, vec2 p) {
  p = floor(p * vec2(-4.0, 4.0) + 2.5);
  if (clamp(p.x, 0.0, 4.0) == p.x && clamp(p.y, 0.0, 4.0) == p.y) {
    int a = int(round(p.x) + 5.0 * round(p.y));
    if (((n >> a) & 1) == 1) return 1.0;
  }
  return 0.0;
}

void main() {
  vec2 pix = vUv * uResolution;

  vec2 cellSize = vec2(uCharSize * 2.0);
  vec2 cellCenterPix = (floor(pix / cellSize) + 0.5) * cellSize;
  vec2 cellCenterUv = cellCenterPix / uResolution;

  vec4 texColor = texture2D(tDiffuse, cellCenterUv);
  if (texColor.a < 0.05) {
    gl_FragColor = vec4(0.0);
    return;
  }

  vec3 balancedColor = pow(texColor.rgb, vec3(1.0 / 1.6));

  float luma = dot(balancedColor, vec3(0.299, 0.587, 0.114));
  float contrastLuma = smoothstep(0.05, 0.90, luma);

  // 3. Balanced character thresholds
  int n = 4096;                          // .
  if (contrastLuma > 0.12) n = 65600;    // :
  if (contrastLuma > 0.25) n = 163153;   // *
  if (contrastLuma > 0.40) n = 15255086; // o
  if (contrastLuma > 0.55) n = 13121101; // &
  if (contrastLuma > 0.70) n = 15252014; // 8
  if (contrastLuma > 0.82) n = 13195790; // @
  if (contrastLuma > 0.92) n = 11512810; // #

  vec2 p = mod(pix / uCharSize, 2.0) - vec2(1.0);
  float shape = character(n, p);

  vec3 textColor;
  if (uUseOriginalColor) {
    textColor = balancedColor * mix(0.7, 1.15, contrastLuma);
  } else {
    textColor = mix(uColorDark, uColorLight, contrastLuma);
  }

  if (uUseHover) {
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    float dist = distance(cellCenterUv * aspect, uMouseScreen * aspect);
    float glow = smoothstep(uHoverRadius, 0.0, dist);
    textColor = mix(textColor, uHoverColor, glow);
  }

  float finalAlpha = clamp(texColor.a * 1.5, 0.0, 1.0) * shape;
  gl_FragColor = vec4(textColor * shape, finalAlpha);
}