<script context="module">
  import { browser } from "$app/environment"
  import * as THREE from "three"

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

        const distance = 1200

        const container = document.getElementById('threeD-graph')
        if (container) {
          const graph = ForceGraph3D()(container)
            .nodeThreeObject(() => {
              const obj = new THREE.Mesh(
                new THREE.SphereGeometry(12),
                new THREE.MeshBasicMaterial({ 
                  color: 0x7a7aa9 ,
                  transparent: true,
                  opacity: 0.25
                })
              )
              return obj
            })
            .cooldownTicks(100)
            .graphData(gData)
            .enableNodeDrag(false)
            .showNavInfo(false)
            .backgroundColor('rgba(0, 0, 0, 0)')
            .linkColor(() => '#7a7aa9')
            .linkOpacity(0.3)
            .cameraPosition({ z: distance })
            .enablePointerInteraction(false)
            .enableNodeDrag(false)
            .enableNavigationControls(false)

          graph.d3Force('link').distance(50)
          graph.d3Force('charge').strength(-120)

          // camera orbit
          let angle = 0
          setInterval(() => {
            graph.cameraPosition({
              x: distance * Math.sin(angle),
              y: distance * (Math.sin(angle) / 2),
              z: distance * Math.cos(angle)
            })
            angle += Math.PI / 5000
          }, 20)
        }
      })
      .catch(error => {
        console.error("Error importing 3d-force-graph:", error)
      })
  }
</script>


<div class="network-container">
  <div id="threeD-graph"></div>
</div>


<style>
  .network-container {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 80vw;
    height: 100vh;
    overflow: hidden;
    z-index: -1;
  }

  #threeD-graph {
    width: 80%;
    height: 100%;
  }
</style>