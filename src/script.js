import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { BoxBufferGeometry, BoxGeometry, MeshStandardMaterial, Plane, WebGLRenderer } from 'three'

const canvas = document.querySelector('canvas.webgl')

const textureLoader = new THREE.TextureLoader()
const woodfurnishtexture = textureLoader.load('textures/my/wood.jpg')
const monitortexture = textureLoader.load('textures/my/monitor.jpg')
const metalbodytexture = textureLoader.load('textures/my/metalbody.jpg')
const pubgtexture = textureLoader.load('textures/my/pubg.jpg')
const Keyboardtexture = textureLoader.load('textures/my/Keyboard.jpg')
const Lamptexture = textureLoader.load('textures/my/lamp.jpg')
const Wall1 = textureLoader.load('textures/my/wall3.jpg')
const Wall2 = textureLoader.load('textures/my/wall1.jpg')
const Wall3 = textureLoader.load('textures/my/wall2.jpg')
const texttexture = textureLoader.load('textures/my/text.jpg')

// Scene //
const scene = new THREE.Scene()

const moonLight = new THREE.AmbientLight('#b9d5ff', 0.1)
moonLight.castShadow = true
scene.add(moonLight)


const point1 = new THREE.PointLight('#F0F8FF', 0.9)
point1.castShadow = true
point1.position.y = 4
point1.position.x = -4
point1.position.z = 3
scene.add(point1)

const point2 = new THREE.PointLight('#FF0000', 0.19)
point2.position.y = 4
point2.position.z = 2
point2.position.x = -7
scene.add(point2)

const fontLoader = new THREE.FontLoader()

fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) => {
        fontLoader.load(
            '/fonts/helvetiker_regular.typeface.json',
            (font) => {
                // Material
                const material = new THREE.MeshMatcapMaterial({ map: metalbodytexture })

                // Text
                const textGeometry = new THREE.TextBufferGeometry(
                    'INFERNUS', {
                        font: font,
                        size: 1.2,
                        height: 0.2,
                        curveSegments: 12,
                        bevelEnabled: true,
                        bevelThickness: 0.2,
                        bevelSize: 0.02,
                        bevelOffset: 0,
                        bevelSegments: 5
                    }
                )
                textGeometry.center()

                const text = new THREE.Mesh(textGeometry, material)
                text.position.y = 0.64
                text.position.z = 0.2
                text.castShadow = true

                scene.add(text)

            }
        )
    }
)

// Floor //
const floor = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(20, 20),
    new THREE.MeshStandardMaterial({
        map: woodfurnishtexture
    })
)
floor.receiveShadow = true
floor.rotation.x = -Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

// Cabin //
const wall1 = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(20, 10),
    new THREE.MeshStandardMaterial({
        map: Wall1
    })
)

wall1.receiveShadow = true
wall1.position.z = -10
wall1.position.y = 5
scene.add(wall1)

const wall2 = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(20, 10),
    new THREE.MeshStandardMaterial({
        map: Wall2
    })
)

wall2.receiveShadow = true
wall2.rotation.y = -Math.PI * 0.5
wall2.position.y = 5
wall2.position.x = 10
scene.add(wall2)

const wall3 = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(20, 10),
    new THREE.MeshStandardMaterial({
        map: Wall3
    })
)
wall3.receiveShadow = true
wall3.rotation.y = Math.PI * 0.5
wall3.position.y = 5
wall3.position.x = -10
scene.add(wall3)


// Lamp //
const base = new THREE.Mesh(
    new THREE.BoxBufferGeometry(3, 0.1, 2),
    new MeshStandardMaterial({
        map: Lamptexture
    })
)
base.position.z = 1
base.position.y = 0.1
base.position.x = -7
base.rotation.y = -0.7 * Math.PI
base.castShadow = true
scene.add(base)

// Stand //
const stand = new THREE.Mesh(
    new THREE.BoxBufferGeometry(0.4, 3, 0.4),
    new MeshStandardMaterial({
        map: Lamptexture
    })
)
stand.position.x = -7
stand.position.y = 1.64
stand.position.z = 1
stand.rotation.y = 0.3
stand.castShadow = true
scene.add(stand)

const lamp = new THREE.Mesh(
    new THREE.BoxBufferGeometry(5, 1.5, 2),
    new THREE.MeshStandardMaterial({
        map: Lamptexture
    })
)
lamp.position.x = -7
lamp.position.y = 3.1
lamp.position.z = 1
lamp.rotation.y = -0.7 * Math.PI
lamp.castShadow = true
scene.add(lamp)

const lamplight = new THREE.Mesh(
    new BoxBufferGeometry(4, 1.2, 0.1),
    new MeshStandardMaterial({
        color: 0xffffff
    })
)
lamplight.position.x = -6.12
lamplight.position.y = 3.1
lamplight.position.z = 1.6
lamplight.rotation.y = -0.7 * Math.PI
lamplight.castShadow = true
scene.add(lamplight)

// Box //
const box = new THREE.Mesh(
    new BoxBufferGeometry(3, 1, 3),
    new MeshStandardMaterial({
        map: monitortexture
    })
)
box.castShadow = true
box.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(box.geometry.attributes.uv.array, 2))
box.position.y = 0.51
box.position.z = -4
scene.add(box)

const box2 = new THREE.Mesh(
    new BoxBufferGeometry(1, 1, 1),
    new MeshStandardMaterial({
        map: monitortexture
    })
)
box2.castShadow = true
box2.position.y = 1
box2.position.z = -4
scene.add(box2)

const monitor = new THREE.Mesh(
    new BoxBufferGeometry(10, 6, 1),
    new MeshStandardMaterial({
        map: monitortexture
    })
)
monitor.castShadow = true
monitor.position.y = 4.5
monitor.position.z = -4
scene.add(monitor)

const screen = new THREE.Mesh(
    new BoxBufferGeometry(9, 5, 0.2),
    new MeshStandardMaterial({
        map: pubgtexture
    })
)
screen.position.y = 4.46
screen.position.z = -4 + 0.41
scene.add(screen)

const player = new THREE.Mesh(
    new BoxBufferGeometry(1.5, 0.5, 0.1),
    new MeshStandardMaterial({
        color: 0xffffff
    })
)
player.position.x = 7
player.position.y = 5
player.position.z = 6.5
scene.add(player)

const cpu = new THREE.Mesh(
    new BoxBufferGeometry(2, 6, 9),
    new MeshStandardMaterial({
        map: metalbodytexture
    })
)
cpu.castShadow = true
cpu.position.x = 7
cpu.position.y = 3
cpu.position.z = 2

scene.add(cpu)

// Sizes //
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Camera //
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.y = 12
camera.position.z = 25
scene.add(camera)


// Keyboard //
const Keyboard = new THREE.Mesh(
    new BoxGeometry(10, 0.5, 3.5),
    new MeshStandardMaterial({
        map: Keyboardtexture
    })
)

Keyboard.castShadow = true
Keyboard.position.z = 6
Keyboard.position.y = 0.6
Keyboard.rotation.x = 0.2
scene.add(Keyboard)

// Update //
window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
})

const renderer = new WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true

// Controls //
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Animate //
const clock = new THREE.Clock()
const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()