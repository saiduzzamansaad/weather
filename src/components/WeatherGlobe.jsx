import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';

const WeatherGlobe = ({ weatherData }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Earth
    const earthGeometry = new THREE.SphereGeometry(5, 64, 64);
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load('/textures/earth_daymap.jpg'),
      bumpMap: new THREE.TextureLoader().load('/textures/earth_bumpmap.jpg'),
      bumpScale: 0.05,
      specularMap: new THREE.TextureLoader().load('/textures/earth_specularmap.jpg'),
      specular: new THREE.Color('grey')
    });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

    // Clouds
    const cloudGeometry = new THREE.SphereGeometry(5.1, 64, 64);
    const cloudMaterial = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load('/textures/earth_clouds.jpg'),
      transparent: true,
      opacity: 0.4
    });
    const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
    scene.add(clouds);

    // Weather effects
    const addWeatherEffects = () => {
      if (weatherData.weather[0].main === 'Rain') {
        // Rain effect
        const rainGeometry = new THREE.BufferGeometry();
        const rainCount = 5000;
        const positions = new Float32Array(rainCount * 3);
        
        for (let i = 0; i < rainCount; i++) {
          positions[i * 3] = (Math.random() - 0.5) * 10;
          positions[i * 3 + 1] = Math.random() * 5 + 5;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        
        rainGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const rainMaterial = new THREE.PointsMaterial({
          color: 0xaaaaaa,
          size: 0.01,
          transparent: true
        });
        const rain = new THREE.Points(rainGeometry, rainMaterial);
        scene.add(rain);
      } else if (weatherData.weather[0].main === 'Snow') {
        // Snow effect
        const snowGeometry = new THREE.BufferGeometry();
        const snowCount = 2000;
        const positions = new Float32Array(snowCount * 3);
        
        for (let i = 0; i < snowCount; i++) {
          positions[i * 3] = (Math.random() - 0.5) * 10;
          positions[i * 3 + 1] = Math.random() * 5 + 5;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        
        snowGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const snowMaterial = new THREE.PointsMaterial({
          color: 0xffffff,
          size: 0.05,
          transparent: true
        });
        const snow = new THREE.Points(snowGeometry, snowMaterial);
        scene.add(snow);
      }
    };

    // Post-processing
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const fxaaPass = new ShaderPass(FXAAShader);
    fxaaPass.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight);
    composer.addPass(fxaaPass);

    // Camera position
    camera.position.z = 10;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      earth.rotation.y += 0.001;
      clouds.rotation.y += 0.0005;
      controls.update();
      composer.render();
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      composer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      fxaaPass.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [weatherData]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">3D আবহাওয়া গ্লোব</h2>
      </div>
      <div 
        ref={mountRef} 
        className="w-full h-96 md:h-[500px]"
        style={{ position: 'relative' }}
      />
    </div>
  );
};

export default WeatherGlobe;