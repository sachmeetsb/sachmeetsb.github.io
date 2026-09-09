import{r as c,j as w}from"./react-vendor-Yn3wAi4Q.js";import{C as y,S as x,P as E,a as b,V as R,M as j,W as F}from"./three-vendor-Ch08p_PI.js";function W({className:u="absolute inset-0"}){const o=c.useRef(null),e=c.useRef(null);return c.useEffect(()=>{if(!o.current)return;const n=o.current,v=`
      void main() {
        gl_Position = vec4( position, 1.0 );
      }
    `,h=`
      #define TWO_PI 6.2831853072
      #define PI 3.14159265359

      precision highp float;
      uniform vec2 resolution;
      uniform float time;

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        float t = time*0.05;
        float lineWidth = 0.002;

        // Accumulate three time-offset layers of glow intensity.
        vec3 layers = vec3(0.0);
        for(int j = 0; j < 3; j++){
          for(int i=0; i < 5; i++){
            layers[j] += lineWidth*float(i*i) / abs(fract(t - 0.01*float(j)+float(i)*0.01)*5.0 - length(uv) + mod(uv.x+uv.y, 0.2));
          }
        }

        // Map intensity onto the Kartar saffron palette: deep saffron core
        // fading to a lighter amber on the brighter inner layers.
        float glow = layers.r + layers.g + layers.b;
        vec3 saffron = vec3(1.0, 0.368, 0.055);   // #FF5E0E
        vec3 amber   = vec3(1.0, 0.620, 0.345);   // #FF9E58
        vec3 color = mix(saffron, amber, clamp(layers.g * 1.6, 0.0, 1.0)) * glow;

        gl_FragColor = vec4(color, 1.0);
      }
    `,i=new y;i.position.z=1;const a=new x,d=new E(2,2),r={time:{type:"f",value:1},resolution:{type:"v2",value:new R}},m=new b({uniforms:r,vertexShader:v,fragmentShader:h}),g=new j(d,m);a.add(g);const t=new F({antialias:!0});t.setPixelRatio(window.devicePixelRatio),n.appendChild(t.domElement);const s=()=>{const l=n.clientWidth,p=n.clientHeight;t.setSize(l,p),r.resolution.value.x=t.domElement.width,r.resolution.value.y=t.domElement.height};s(),window.addEventListener("resize",s,!1);const f=()=>{const l=requestAnimationFrame(f);r.time.value+=.05,t.render(a,i),e.current&&(e.current.animationId=l)};return e.current={camera:i,scene:a,renderer:t,uniforms:r,animationId:0},f(),()=>{window.removeEventListener("resize",s),e.current&&(cancelAnimationFrame(e.current.animationId),n&&e.current.renderer.domElement&&n.removeChild(e.current.renderer.domElement),e.current.renderer.dispose(),d.dispose(),m.dispose())}},[]),w.jsx("div",{ref:o,className:u,style:{background:"#000",overflow:"hidden"}})}export{W as ShaderAnimation,W as default};
