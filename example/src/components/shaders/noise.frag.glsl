varying vec3 vNormal;
varying vec3 vReflect;
varying float ao;
uniform vec3 color;

float PI = 3.14159265358979323846264;

void main() {

  float yaw = .5 - atan( vReflect.z, - vReflect.x ) / ( 2.0 * PI );
  float pitch = .5 - asin( vReflect.y ) / PI;
  vec2 pos = vec2( yaw, pitch );
  float diffuse_value1 = .0015 * max(dot(vNormal, vec3( -490.0, 29.8, -85.8 ) ), 0.0);
  float diffuse_value2 = .0005 * max(dot(vNormal, vec3( -460.0, 40.27, 187.4 ) ), 0.0);
  float diffuse_value3 = .0010 * max(dot(vNormal, vec3( 175.5, 30.04, 466.4 ) ), 0.0);
  float diffuse_value4 = .0005 * max(dot(vNormal, vec3( 466.0, 45.3, 172.9 ) ), 0.0);

  gl_FragColor = vec4( color - .15 * ao + .5 * vec3( diffuse_value1 + diffuse_value2 + diffuse_value3 + diffuse_value4 ), 1.0 );
}
