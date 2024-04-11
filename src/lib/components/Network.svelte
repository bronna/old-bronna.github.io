<script context="module">
  import { browser } from "$app/environment"
  import * as THREE from "three"
  //import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js"

  let ForceGraph3D;

  if (browser) {
    import("3d-force-graph")
      .then(module => {
        ForceGraph3D = module.default

        // Random tree
        const N = 300;
        const gData = {
          nodes: [...Array(N).keys()].map(i => ({ id: i })),
          links: [...Array(N).keys()]
            .filter(id => id)
            .map(id => ({
              source: id,
              target: Math.round(Math.random() * (id - 1))
            }))
        }

        const distance = 1700

        const container = document.getElementById('3d-graph')
        if (container) {
          const graph = ForceGraph3D()(container)
            .nodeThreeObject(() => {
              const obj = new THREE.Mesh(
                new THREE.SphereGeometry(12),
                new THREE.MeshBasicMaterial({ 
                  color: 0xD8BFD8 ,
                  transparent: true,
                  opacity: 0.5
                })
              )
              return obj
            })
            .cooldownTicks(100)
            .graphData(gData)
            .enableNodeDrag(false)
            .showNavInfo(false)
            .backgroundColor('rgba(0, 0, 0, 0)')
            .linkOpacity(0.25)
            .cameraPosition({ z: distance })

          // camera orbit
          let angle = 0
          setInterval(() => {
            graph.cameraPosition({
              x: distance * Math.sin(angle),
              y: distance * (Math.sin(angle) / 2),
              z: distance * Math.cos(angle)
            })
            angle += Math.PI / 5000
          }, 10)

          // // Add glow effect with three.js postprocessing
          // const bloomPass = new UnrealBloomPass()
          // bloomPass.strength = 4
          // bloomPass.radius = 1
          // bloomPass.threshold = 0
          
          // graph.postProcessingComposer().addPass(bloomPass)
        }
      })
      .catch(error => {
        console.error("Error importing 3d-force-graph:", error)
      })
  }
</script>

<div class="network-container">
  <div id="3d-graph"></div>
</div>

<style>
  .network-container {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 80vw;
    height: 80vh;
    overflow: hidden;
    z-index: -1;
  }

  #3d-graph {
    width: 100%;
    height: 100%;
  }
</style>