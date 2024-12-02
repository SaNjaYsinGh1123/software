import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ThreeScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Texture loader
    const textureLoader = new THREE.TextureLoader();
    
    // Load Earth day texture (ensure the paths are correct)
    const earthTexture = textureLoader.load('/earth_daymap.jpg'); 
    const earthBumpMap = textureLoader.load('/earth_normal_map.jpg');
    const earthSpecularMap = textureLoader.load('/earth_specular_map.jpg');
    const earthNightMap = textureLoader.load('/earth_nightmap.jpg');

    // Create the Earth sphere
    const geometry = new THREE.SphereGeometry(1, 64, 64);

    // Phong material for the Earth to handle lighting better
    const material = new THREE.MeshPhongMaterial({
      map: earthTexture, // Day texture
      nightTexture: { value: earthNightMap },
      bumpMap: earthBumpMap, // Bump map for surface details
      bumpScale: 0.05,
      specularMap: earthSpecularMap, // Specular map for ocean reflections
      shininess: 1500
    });

    const earth = new THREE.Mesh(geometry, material);
    scene.add(earth);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040); // Soft ambient light
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Bright directional light (like the sun)
    directionalLight.position.set(5, 3, 5); // Position the light
    scene.add(directionalLight);

    // Orbit controls for camera interaction
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;

    camera.position.z = 3;

    // Set rotation speed
    const rotationSpeedY = 0.002; // Y-axis rotation speed

    // Animate the scene
    const animate = function () {
      requestAnimationFrame(animate);

      // Rotate the Earth around the Y-axis (vertical rotation)
      earth.rotation.y += rotationSpeedY;

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Adjust renderer and camera on window resize
    window.addEventListener('resize', () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    });

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef}></div>;
};

export default ThreeScene;
