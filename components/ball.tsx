import { RigidBody } from "@react-three/rapier"

interface BallProps {
  position: [number, number, number]
  color: string
}

export default function Ball({ position, color }: BallProps) {
  return (
    <RigidBody colliders="ball" restitution={1} friction={0.25} position={position}>
      <mesh castShadow>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshBasicMaterial color={color} wireframe />
      </mesh>
    </RigidBody>
  )
}
