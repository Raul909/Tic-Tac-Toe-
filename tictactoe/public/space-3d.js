// Three.js 3D Space Background with Photorealistic Planets and Stars
(function() {
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x000510, 0.0015);
  
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
  const renderer = new THREE.WebGLRenderer({ 
    canvas: document.getElementById('three-canvas'),
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.8;
  camera.position.set(0, 20, 80);
  
  // Photorealistic Starfield with Multiple Layers
  const starGeometry = new THREE.BufferGeometry();
  const starVertices = [];
  const starColors = [];
  const starSizes = [];
  
  for (let i = 0; i < 15000; i++) {
    const x = (Math.random() - 0.5) * 3000;
    const y = (Math.random() - 0.5) * 3000;
    const z = (Math.random() - 0.5) * 3000;
    starVertices.push(x, y, z);
    
    // Realistic star colors (blue, white, yellow, orange, red)
    const temp = Math.random();
    if (temp < 0.1) {
      starColors.push(0.6, 0.8, 1.0); // Blue (hot)
    } else if (temp < 0.4) {
      starColors.push(1.0, 1.0, 1.0); // White
    } else if (temp < 0.7) {
      starColors.push(1.0, 1.0, 0.8); // Yellow
    } else if (temp < 0.9) {
      starColors.push(1.0, 0.8, 0.6); // Orange
    } else {
      starColors.push(1.0, 0.6, 0.5); // Red (cool)
    }
    
    starSizes.push(Math.random() * 2 + 0.5);
  }
  
  starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
  starGeometry.setAttribute('color', new THREE.Float32BufferAttribute(starColors, 3));
  starGeometry.setAttribute('size', new THREE.Float32BufferAttribute(starSizes, 1));
  
  const starMaterial = new THREE.PointsMaterial({ 
    size: 1.5,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending
  });
  
  const stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);
  
  // Distant Galaxy/Nebula Background
  const nebulaGeometry = new THREE.BufferGeometry();
  const nebulaVertices = [];
  const nebulaColors = [];
  
  for (let i = 0; i < 3000; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    const r = 800 + Math.random() * 400;
    
    nebulaVertices.push(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta),
      r * Math.cos(phi)
    );
    
    // Purple/blue nebula colors
    const intensity = Math.random() * 0.3;
    nebulaColors.push(
      0.3 + intensity,
      0.1 + intensity * 0.5,
      0.6 + intensity
    );
  }
  
  nebulaGeometry.setAttribute('position', new THREE.Float32BufferAttribute(nebulaVertices, 3));
  nebulaGeometry.setAttribute('color', new THREE.Float32BufferAttribute(nebulaColors, 3));
  
  const nebulaMaterial = new THREE.PointsMaterial({
    size: 8,
    vertexColors: true,
    transparent: true,
    opacity: 0.15,
    blending: THREE.AdditiveBlending
  });
  
  const nebula = new THREE.Points(nebulaGeometry, nebulaMaterial);
  scene.add(nebula);
  
  // Realistic Planets with Textures
  const planets = [];
  
  // Create realistic planet material
  function createPlanet(radius, color, emissive, position, hasRings = false, hasAtmosphere = false) {
    const geometry = new THREE.SphereGeometry(radius, 64, 64);
    const material = new THREE.MeshPhongMaterial({ 
      color: color,
      emissive: emissive,
      emissiveIntensity: 0.2,
      shininess: 15,
      specular: 0x333333
    });
    
    const planet = new THREE.Mesh(geometry, material);
    planet.position.set(position.x, position.y, position.z);
    planet.castShadow = true;
    planet.receiveShadow = true;
    scene.add(planet);
    
    // Add atmosphere glow
    if (hasAtmosphere) {
      const glowGeometry = new THREE.SphereGeometry(radius * 1.15, 32, 32);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.15,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      planet.add(glow);
    }
    
    // Add rings
    if (hasRings) {
      const ringGeometry = new THREE.RingGeometry(radius * 1.5, radius * 2.2, 64);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 2;
      planet.add(ring);
      
      // Ring shadow
      const ringGeometry2 = new THREE.RingGeometry(radius * 1.5, radius * 2.2, 64);
      const ringMaterial2 = new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide
      });
      const ringShadow = new THREE.Mesh(ringGeometry2, ringMaterial2);
      ringShadow.rotation.x = Math.PI / 2;
      ringShadow.position.y = -0.5;
      planet.add(ringShadow);
    }
    
    return planet;
  }
  
  // Sun with realistic glow
  const sunGeometry = new THREE.SphereGeometry(12, 64, 64);
  const sunMaterial = new THREE.MeshBasicMaterial({ 
    color: 0xFDB813,
    emissive: 0xFDB813,
    emissiveIntensity: 1
  });
  const sun = new THREE.Mesh(sunGeometry, sunMaterial);
  sun.position.set(-100, 30, -150);
  scene.add(sun);
  
  // Sun corona
  const coronaGeometry = new THREE.SphereGeometry(16, 32, 32);
  const coronaMaterial = new THREE.MeshBasicMaterial({
    color: 0xFDB813,
    transparent: true,
    opacity: 0.2,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending
  });
  const corona = new THREE.Mesh(coronaGeometry, coronaMaterial);
  sun.add(corona);
  
  // Lens flare effect
  const flareGeometry = new THREE.SphereGeometry(20, 32, 32);
  const flareMaterial = new THREE.MeshBasicMaterial({
    color: 0xFFAA00,
    transparent: true,
    opacity: 0.1,
    blending: THREE.AdditiveBlending
  });
  const flare = new THREE.Mesh(flareGeometry, flareMaterial);
  sun.add(flare);
  
  // Earth - blue with atmosphere
  const earth = createPlanet(4, 0x4A90E2, 0x112244, { x: 40, y: -15, z: -60 }, false, true);
  planets.push({ mesh: earth, speed: 0.0008, radius: 50, angle: 0, rotationSpeed: 0.01 });
  
  // Mars - red planet
  const mars = createPlanet(3, 0xE27B58, 0x331100, { x: -50, y: 20, z: -70 }, false, false);
  planets.push({ mesh: mars, speed: 0.0005, radius: 65, angle: Math.PI, rotationSpeed: 0.008 });
  
  // Jupiter - gas giant
  const jupiter = createPlanet(8, 0xC88B3A, 0x221100, { x: 80, y: 35, z: -100 }, false, false);
  planets.push({ mesh: jupiter, speed: 0.0002, radius: 90, angle: Math.PI / 2, rotationSpeed: 0.015 });
  
  // Saturn - with rings
  const saturn = createPlanet(7, 0xFAD5A5, 0x221100, { x: -70, y: -25, z: -90 }, true, false);
  planets.push({ mesh: saturn, speed: 0.00015, radius: 80, angle: Math.PI * 1.5, rotationSpeed: 0.012 });
  
  // Venus - bright
  const venus = createPlanet(3.5, 0xFFC649, 0x332200, { x: 25, y: 10, z: -50 }, false, true);
  planets.push({ mesh: venus, speed: 0.001, radius: 40, angle: Math.PI / 4, rotationSpeed: 0.005 });
  
  // Cinematic Lighting
  const ambientLight = new THREE.AmbientLight(0x404060, 0.3);
  scene.add(ambientLight);
  
  // Sun point light
  const sunLight = new THREE.PointLight(0xFDB813, 2, 300);
  sunLight.position.copy(sun.position);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.width = 1024;
  sunLight.shadow.mapSize.height = 1024;
  scene.add(sunLight);
  
  // Rim light (backlight for depth)
  const rimLight = new THREE.DirectionalLight(0x4080ff, 0.3);
  rimLight.position.set(50, 50, 50);
  scene.add(rimLight);
  
  // Fill light
  const fillLight = new THREE.DirectionalLight(0x8040ff, 0.15);
  fillLight.position.set(-50, -30, 30);
  scene.add(fillLight);
  
  // Shooting Stars System
  const shootingStars = [];
  
  function createShootingStar() {
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    
    // Create trail
    for (let i = 0; i < 20; i++) {
      positions.push(0, 0, 0);
      const intensity = 1 - (i / 20);
      colors.push(1, 1, intensity);
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    
    const material = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      linewidth: 2
    });
    
    const line = new THREE.Line(geometry, material);
    
    // Random starting position
    const angle = Math.random() * Math.PI * 2;
    const distance = 200 + Math.random() * 300;
    line.position.set(
      Math.cos(angle) * distance,
      50 + Math.random() * 100,
      Math.sin(angle) * distance
    );
    
    // Random velocity
    const speed = 2 + Math.random() * 3;
    const direction = new THREE.Vector3(
      (Math.random() - 0.5) * 2,
      -1 - Math.random(),
      (Math.random() - 0.5) * 2
    ).normalize();
    
    scene.add(line);
    
    return {
      line: line,
      velocity: direction.multiplyScalar(speed),
      life: 1,
      positions: positions
    };
  }
  
  // Create shooting stars periodically
  setInterval(() => {
    if (Math.random() < 0.3 && shootingStars.length < 5) {
      shootingStars.push(createShootingStar());
    }
  }, 2000);
  
  // Asteroid Belt
  const asteroidGeometry = new THREE.DodecahedronGeometry(0.5, 0);
  const asteroids = [];
  
  for (let i = 0; i < 100; i++) {
    const material = new THREE.MeshPhongMaterial({
      color: 0x666666,
      emissive: 0x111111,
      flatShading: true
    });
    const asteroid = new THREE.Mesh(asteroidGeometry, material);
    
    const angle = Math.random() * Math.PI * 2;
    const distance = 110 + Math.random() * 20;
    asteroid.position.set(
      Math.cos(angle) * distance,
      (Math.random() - 0.5) * 10,
      Math.sin(angle) * distance
    );
    
    asteroid.rotation.set(
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    );
    
    const scale = 0.3 + Math.random() * 0.7;
    asteroid.scale.set(scale, scale, scale);
    
    scene.add(asteroid);
    asteroids.push({
      mesh: asteroid,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      orbitSpeed: 0.0001 + Math.random() * 0.0002,
      angle: angle,
      distance: distance
    });
  }
  
  // Animation
  function animate() {
    requestAnimationFrame(animate);
    
    // Rotate stars slowly
    stars.rotation.y += 0.0001;
    stars.rotation.x += 0.00005;
    
    // Rotate sun
    sun.rotation.y += 0.001;
    sunGlow.rotation.y -= 0.001;
    
    // Orbit planets
    planets.forEach(planet => {
      planet.angle += planet.speed;
      const centerX = sun.position.x;
      const centerZ = sun.position.z;
      planet.mesh.position.x = centerX + Math.cos(planet.angle) * planet.radius;
      planet.mesh.position.z = centerZ + Math.sin(planet.angle) * planet.radius;
      planet.mesh.rotation.y += 0.01;
    });
    
    // Gentle camera movement
    camera.position.x = Math.sin(Date.now() * 0.0001) * 5;
    camera.position.y = Math.cos(Date.now() * 0.00015) * 3;
    camera.lookAt(scene.position);
    
    renderer.render(scene, camera);
  }
  
  animate();
  
  // Handle resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
})();
