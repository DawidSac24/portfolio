#include <dithering_fragment>

// 1. FRESNEL EDGE FADE
// Calculate how close the current pixel is to the outer edge of the geometry
vec3 viewDir = normalize(vViewPosition);
vec3 surfaceNormal = normalize(vNormal);
float edgeFactor = abs(dot(viewDir, surfaceNormal));

// Create a smooth gradient: 0.0 at the absolute edge, scaling up to 1.0 just inside the boundary
// Tweak these numbers (e.g., 0.1, 0.4) to make the fade thicker or thinner!
float edgeFade = smoothstep(0.1, 0.4, edgeFactor);

// 2. APPLY BRIGHTNESS
float luma = dot(gl_FragColor.rgb, vec3(0.299, 0.587, 0.114));

// Multiply the brightness by our fade. The edges will artificially drop to 0 (empty space character)
luma *= edgeFade;

float contrastLuma = smoothstep(0.1, 0.8, luma);

// 3. CHARACTER SELECTION
int n = 4096;
if(contrastLuma > 0.1) n = 65600;
if(contrastLuma > 0.25) n = 163153;
if(contrastLuma > 0.4) n = 15255086;
if(contrastLuma > 0.55) n = 13121101;
if(contrastLuma > 0.7) n = 15252014;
if(contrastLuma > 0.85) n = 13195790;
if(contrastLuma > 0.95) n = 11512810;

vec2 p = mod(gl_FragCoord.xy / uCharSize, 2.0) - vec2(1.0);
float shape = character(n, p);

vec3 textColor = mix(uColorDark, uColorLight, contrastLuma);

// 4. HOVER EFFECT
#ifdef USE_UV
  float dist = distance(vUv, uMouseUv);
  float glow = smoothstep(uHoverRadius, 0.0, dist);
  textColor = mix(textColor, uHoverColor, glow);
#endif

// To ensure the fade affects the final alpha transparency as well, we multiply the alpha by edgeFade
gl_FragColor = vec4(textColor * shape, gl_FragColor.a * shape * edgeFade);