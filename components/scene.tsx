"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import Ball from "./ball"
import Tetrahedron from "./tetrahedron"
import { RigidBody } from "@react-three/rapier"
import * as THREE from "three"

export default function Scene() {
  const rigidBodyRef = useRef()

  let rotationX = 0
  let rotationY = 0

  useFrame((_, delta) => {
    if (rigidBodyRef.current) {
      const rotationEuler = new THREE.Euler(rotationX, rotationY, 0)
      const rotationQuaternion = new THREE.Quaternion().setFromEuler(rotationEuler)
      rigidBodyRef.current.setNextKinematicRotation(rotationQuaternion)
      rotationX += delta * 1
      rotationY += delta * 0.4
    }
  })

  const ballColors = ["#CCCCCC", "#AAAAAA", "#888888", "#666666", "#444444", "#222222"]
  const balls = ballColors.flatMap((color) => [
    { position: [Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1], color },
    { position: [Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1], color },
    { position: [Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1], color },
  ])

  return (
    <>
      {balls.map((ball, index) => (
        <Ball key={index} position={ball.position} color={ball.color} />
      ))}
      <RigidBody colliders="hull" restitution={0.7} friction={0.5} ref={rigidBodyRef} type="kinematicPosition">
        <Tetrahedron />
      </RigidBody>
    </>
  )
}
