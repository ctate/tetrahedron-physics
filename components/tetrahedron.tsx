import { DoubleSide } from "three"

export default function Tetrahedron() {
  const a = 2.0
  const vertices = [
    [a, a, a],
    [a, -a, -a],
    [-a, a, -a],
    [-a, -a, a],
  ]

  const faces = [
    [0, 1, 2],
    [0, 1, 3],
    [0, 2, 3],
    [1, 2, 3],
  ]

  return (
    <group>
      {faces.map((face, index) => {
        const v0 = vertices[face[0]]
        const v1 = vertices[face[1]]
        const v2 = vertices[face[2]]

        const centerX = (v0[0] + v1[0] + v2[0]) / 3
        const centerY = (v0[1] + v1[1] + v2[1]) / 3
        const centerZ = (v0[2] + v1[2] + v2[2]) / 3

        const edge1 = [v1[0] - v0[0], v1[1] - v0[1], v1[2] - v0[2]]
        const edge2 = [v2[0] - v0[0], v2[1] - v0[1], v2[2] - v0[2]]
        const normal = [
          edge1[1] * edge2[2] - edge1[2] * edge2[1],
          edge1[2] * edge2[0] - edge1[0] * edge2[2],
          edge1[0] * edge2[1] - edge1[1] * edge2[0],
        ]

        return (
          <mesh key={index} position={[centerX, centerY, centerZ]}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={3}
                itemSize={3}
                array={
                  new Float32Array([
                    v0[0] - centerX,
                    v0[1] - centerY,
                    v0[2] - centerZ,
                    v1[0] - centerX,
                    v1[1] - centerY,
                    v1[2] - centerZ,
                    v2[0] - centerX,
                    v2[1] - centerY,
                    v2[2] - centerZ,
                  ])
                }
              />
              <bufferAttribute
                attach="attributes-normal"
                count={3}
                itemSize={3}
                array={
                  new Float32Array([
                    normal[0],
                    normal[1],
                    normal[2],
                    normal[0],
                    normal[1],
                    normal[2],
                    normal[0],
                    normal[1],
                    normal[2],
                  ])
                }
              />
            </bufferGeometry>
            <meshBasicMaterial color="#FFFFFF" wireframe side={DoubleSide} />
          </mesh>
        )
      })}
    </group>
  )
}
