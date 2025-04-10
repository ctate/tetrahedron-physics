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

  // Define ball colors
  const ballColors = ["#CCCCCC", "#AAAAAA", "#888888", "#666666", "#444444", "#222222"]

  // Create positions for balls in a compact arrangement
  const generateBallPositions = () => {
    const positions = []
    const ballRadius = 0.2
    const minDistance = ballRadius * 2.1 // Minimum distance between ball centers to avoid overlap
    const maxAttempts = 100 // Maximum attempts to place a ball
    const maxRadius = 0.8 // Maximum distance from center

    // Helper function to check if a position is too close to existing positions
    const isTooClose = (pos, existingPositions) => {
      return existingPositions.some((existingPos) => {
        const dx = pos[0] - existingPos[0]
        const dy = pos[1] - existingPos[1]
        const dz = pos[2] - existingPos[2]
        const distanceSquared = dx * dx + dy * dy + dz * dz
        return distanceSquared < minDistance * minDistance
      })
    }

    // Generate 3 positions for each color (18 total)
    ballColors.forEach((color) => {
      for (let i = 0; i < 3; i++) {
        let attempts = 0
        let position

        // Try to find a valid position
        do {
          // Start with positions closer to center
          const radius = Math.random() * maxRadius
          const theta = Math.random() * Math.PI * 2
          const phi = Math.acos(2 * Math.random() - 1)

          position = [
            radius * Math.sin(phi) * Math.cos(theta),
            radius * Math.sin(phi) * Math.sin(theta),
            radius * Math.cos(phi),
          ]

          attempts++
        } while (isTooClose(position, positions) && attempts < maxAttempts)

        // Add the position with its color
        positions.push({ position, color })
      }
    })

    return positions
  }

  const balls = generateBallPositions()

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
