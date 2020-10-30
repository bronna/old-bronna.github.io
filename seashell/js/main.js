let container, stats, clock

let camera, scene, renderer, orbit

let shell

let shellGroup = new THREE.Object3D
let positions = []
let colors = []

let gui

let t = 0

init()
animate()

function init() {
  // document
  container = document.querySelector('#container')

  // camera
  let fov = 40
  let aspect = window.innerWidth / window.innerHeight
  let near = 1
  let far = 100000
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  camera.position.z = 35000

  // scene
  scene = new THREE.Scene()
  //scene.background = new THREE.Color("#ffdfdf")
  //scene.background = new THREE.Color("#275373")
  scene.add(shellGroup)

  // clock
  clock = new THREE.Clock()

  // gui controls
  setupGui()

  // drawing
  drawShell()

  // renderer
  renderer = new THREE.WebGLRenderer({alpha: true, antialias: true})
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.outputEncoding = THREE.sRGBEncoding

  container.appendChild(renderer.domElement)

  // stats monitor
  // stats = new Stats()
  // container.appendChild(stats.dom)

  // orbit controls
  orbit = new THREE.OrbitControls(camera, renderer.domElement)
  orbit.update()

  // event listeners
  window.addEventListener('resize', resize, false)
  // orbit.addEventListener('change', render)

}

function setupGui() {
  gui = new VariaBoard({
    container: document.body,
    title: 'Seashell Generator',
    changeCallback: () => {
      reset()
    }
  })

  // gui.addRange({
  //   id: 'aa',
  //   title: 'Distance from origin',
  //   description: 'distance from the origin at theta = 0',
  //   min: 0,
  //   max: 100,
  //   step: 0.01,
  //   default: 0.01,
  //   eased: false
  // })

  gui.addRange({
    id: 'coils',
    title: 'Coils',
    description: 'Number of coils',
    min: 1,
    max: 10,
    step: 0.1,
    default: 8,
    eased: false
  })

  gui.addRange({
    id: 'beta',
    title: 'Shell taper',
    description: 'Enlarging angle of each coil in z',
    min: -30,
    max: 90,
    step: 0.1,
    default: 19,
    eased: false
  })

  gui.addRange({
    id: 'a',
    title: 'Radius 1 of opening',
    description: 'Radius of the opening ellipse at 0 degrees',
    min: 0,
    max: 50,
    step: 0.1,
    default: 9,
    eased: false
  })

  gui.addRange({
    id: 'b',
    title: 'Radius 2 of opening',
    description: 'Radius of the opening ellipse at 90 degrees',
    min: 0,
    max: 50,
    step: 0.1,
    default: 10,
    eased: false
  })

  gui.addRange({
    id: 'alpha',
    title: 'Spiral angle',
    description: 'Angle of the equiangular spiral - offset from the tangent of a circle',
    min: 1,
    max: 90,
    step: 0.1,
    default: 83,
    eased: false
  })

  gui.addRange({
    id: 'phi',
    title: 'Rotation of opening in z',
    description: 'Rotation of ellipse along z-axis (front-to-back axis relative to face)',
    min: 0,
    max: 90,
    step: 0.1,
    default: 65,
    eased: false
  })

  gui.addRange({
    id: 'omega',
    title: 'Rotation of opening in y',
    description: 'Rotation of ellipse along y-axis (top-to-bottom axis relative to face)',
    min: -45,
    max: 90,
    step: 0.1,
    default: -5,
    eased: false
  })

  gui.addRange({
    id: 'mu',
    title: 'Rotation of opening in x',
    description: 'Rotation of ellipse along x-axis (side-to-side axis relative to face)',
    min: 0,
    max: 90,
    step: 0.1,
    default: 0,
    eased: false
  })

  // gui.addButton({
  //   id: 'freeze',
  //   title: 'Freeze',
  //   description: 'Freeze the shell position',
  //   callback: () => {
  //     reset()
  //   }
  // })
  // gui.addRange({
  //   id: 'lightness',
  //   title: 'Lightness',
  //   description: 'Overall lightness of lines',
  //   min: 0,
  //   max: 100,
  //   step: 1,
  //   default: 60,
  //   eased: false
  // })
  //
  // gui.addButton({
  //   id: 'randomize',
  //   title: 'Randomize',
  //   description: 'Set all controls to random values',
  //   callback: () => {
  //     gui.randomize()
  //   }
  // })
  //
  // gui.addButton({
  //   id: 'generate',
  //   title: 'Generate',
  //   description: 'Generate a new flower',
  //   callback: () => {
  //     reset()
  //   }
  // })
}

function drawShell() {
  positions = []

  let geometry = new THREE.BufferGeometry()
  //let material = new THREE.LineBasicMaterial({color: 0x4BA5AF})
  let material = new THREE.LineBasicMaterial({vertexColors: true, morphTargets: true})
  let spiralSegments = 48
  let ellipseSegments = 36

  // base spiral variables - the spine
  let aa = 25 //radius at theta = 0
  let theta = 0 //start angle
  let coils = gui.get('coils') //number coils
  let t = 2*Math.PI * coils //end angle
  let alpha = gui.get('alpha') * (Math.PI/180) //angle of tangent (offset from 90 degrees)
  let beta = gui.get('beta') * (Math.PI/180) //enlarging angle in z

  // ellipse section variables - the ribs
  let s = 0 //start angle of ellipse
  let a = gui.get('a') //radius of ellipse at s = 0
  let b = gui.get('b') //radius of ellipse at s = 90 degrees
  let tCircle = 2*Math.PI //end angle of ellipse
  let phi = gui.get('phi') * (Math.PI/180) //rotation of ellipse along z-axis (front-to-back axis relative to face)
  let omega = gui.get('omega') * (Math.PI/180) //rotation of ellipse along y-axis (top-to-bottom axis relative to face)
  let mu = gui.get('mu') * (Math.PI/180) //rotation of ellipse along x-axis (side-to-side axis relative to face)

  // nodule variables (if there are nodules)
  let w1 = 1 * (Math.PI/180) //length of each nodule along the ellipse (side-view)
  let w2 = 1 * (Math.PI/180) //length of each nodule along the helico-spiral (top-view)
  let nn = 1 //number of nodules along the full revolution of the ellipse
  let ll = 0 //length of nodule
  let pp = 0 * (Math.PI/180) //angle position of the nodule on the curve

  // the helico-spiral (spine) of the shell
  for (let i = theta; i < t; i = i + (Math.PI/spiralSegments)) {
    let r = (aa * Math.exp(i * (1/Math.tan(alpha)))) * 6

    let count = 0

    // the ellipse (rib) at this point along the spiral
    for (let j = s; j < tCircle; j = j + (Math.PI/ellipseSegments)) {

      //add nodules if there are any
      let lTheta = 2*Math.PI / nn * ( nn * i / 2*Math.PI - Math.floor(nn * i / 2*Math.PI) )
      let rn = ll * Math.exp( -( Math.pow( 2 * (j - pp) / w1 , 2) + Math.pow( 2 * lTheta / w2 , 2) ) )

      // radius of the ellipse 0 < j < 2*pi - constant for a circle
      let re = Math.pow( Math.pow(Math.cos(j) / a , 2) + Math.pow(Math.sin(j) / b , 2), -0.5 ) + rn

      // cartesian coordinates of each point along the ellipse
      let x = ( aa * Math.sin(beta) * Math.cos(i)
        + Math.cos(j + phi) * Math.cos(i + omega) * re
        - Math.sin(mu) * Math.sin(j + phi) * Math.sin(i + omega) * re )
        * Math.exp(i / Math.tan(alpha))

      let y = ( aa * Math.sin(beta) * Math.sin(i)
        + Math.cos(j + phi) * Math.sin(i + omega) * re
        + Math.sin(mu) * Math.sin(j + phi) * Math.cos(i + omega) * re )
        * Math.exp(i / Math.tan(alpha))

      let z = ( -aa * Math.cos(beta)
        + Math.cos(mu) * Math.sin(j + phi) * re )
        * Math.exp(i / Math.tan(alpha))

      function addVertices() {
        positions.push(x, y, z)
        colors.push(x * 12 / r + 1.1)
        colors.push(y * 5 / r + 1.1)
        colors.push(z * 3 / r + 1.1)
      }

      //colors.push((x / (v * r)) + w)
      //v = .4, w = 1, u = 1

      if(count === 0 | count === ellipseSegments * 2) {
        addVertices()
      } else {
        addVertices()
        addVertices()
      }

      count++

    }

  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))

  let shell = new THREE.LineSegments(geometry, material)
  shell.geometry.center()

  shellGroup.add(shell)
}

function resize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
}

function animate() {
  requestAnimationFrame(animate)

  render()
  // stats.update()
}

function render() {
  let delta = clock.getDelta()
  let time = clock.getElapsedTime()

  shellGroup.rotation.x = time * -0.07
  shellGroup.rotation.y = time * -0.035

  renderer.render(scene, camera)
}

function reset() {
  // remove all children from mesh group
  if(shellGroup) {
    while(shellGroup.children.length) {
      shellGroup.remove(shellGroup.children[0])
    }
  }

  drawShell()
  render()
}
