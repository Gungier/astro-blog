import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Scene = () => {
    const mountRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      const width = mountRef.current?.clientWidth ?? 0;
      const height = mountRef.current?.clientHeight ?? 0;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(width, height);
      mountRef.current?.appendChild(renderer.domElement);
  
      const sphereComponent = new Sphere();
      const sphere = sphereComponent.init();
      scene.add(sphere);
  
      camera.position.z = 5;
  
      const animate = function () {
        requestAnimationFrame(animate);
        sphereComponent.rotate();
        renderer.render(scene, camera);
      };
  
      animate();
  
      return () => {
        mountRef.current?.removeChild(renderer.domElement);
      };
    }, []);
  
    return <div ref={mountRef} style={{ width: '800px', height: '600px' }} />;
  };
  
  // Class component for the sphere
  class Sphere {
    mesh: THREE.Mesh;
  
    constructor() {
      this.mesh = this.createSphere();
    }
  
    /**
     * Creates a sphere with hemisphere textures.
     * @returns {THREE.Mesh} The sphere mesh.
     */
    createSphere(): THREE.Mesh {
      const geometry = new THREE.SphereGeometry(1, 32, 32);
      const material = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('/public/eastHemi.jpg'),
        // You may need to adjust the texture offset and repeat for a perfect fit
      });
      const mesh = new THREE.Mesh(geometry, material);
      return mesh;
    }
  
    /**
     * Initializes the sphere.
     * @returns {THREE.Mesh} The sphere mesh.
     */
    init(): THREE.Mesh {
      return this.mesh;
    }
  
    /**
     * Rotates the sphere.
     */
    rotate() {
      this.mesh.rotation.y += 0.01;
    }
  }
  
  export default Scene;
  