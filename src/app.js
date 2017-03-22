import * as THREE from 'three'
import {
  App,
  app as AppModules,
  controls as ControlsModules,
  Box
} from 'whs'

const {
  ElementModule,
  SceneModule,
  CameraModule,
  RenderingModule
} = AppModules
const {
  OrbitModule
} = ControlsModules

const app = new App([
  new ElementModule(),
  new SceneModule(),
  new CameraModule({
    position: {
      z: -5
    }
  }),
  new RenderingModule(),
  new OrbitModule()
])

new Box({
  material: new THREE.MeshNormalMaterial()  
}).addTo(app)

app.start()
