// ascii_frag.glsl
#include <dithering_fragment>

float luma = dot(gl_FragColor.rgb, vec3(0.299, 0.587, 0.114));
float contrastLuma = smoothstep(0.1, 0.8, luma);

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

// THE FIX: GPU Safety Check
#ifdef USE_UV
  float dist = distance(vUv, uMouseUv);
  float glow = smoothstep(uHoverRadius, 0.0, dist);
  textColor = mix(textColor, uHoverColor, glow);
#endif

gl_FragColor = vec4(textColor * shape, gl_FragColor.a * shape);