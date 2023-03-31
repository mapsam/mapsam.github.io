window.onload = function() {
  // FIRST
  first();
  texture();
  vertices();
  rotation();
  rotateAxis();
}

function first() {
  // camera & scene
  const elem = document.getElementById('first');
  const camera = new THREE.PerspectiveCamera( 70, elem.offsetWidth / elem.offsetHeight, 0.01, 10 );
  camera.position.z = 1;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xffffff );

  // shape
  const geometry = new THREE.SphereGeometry( 0.5, 10, 5 );
  const material = new THREE.MeshBasicMaterial({
    color: 0xF012BE,
  });
  const mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );

  // wireframe
  const wireframeGeometry = new THREE.WireframeGeometry( geometry );
  const wireframeMaterial = new THREE.LineBasicMaterial( {
    color: 0xffffff,
    transparent: true,
    opacity: 0.25
  } );
  const wireframe = new THREE.LineSegments( wireframeGeometry, wireframeMaterial );
  mesh.add( wireframe );

  // renderer
  const renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setSize( elem.offsetWidth, elem.offsetHeight );
  elem.appendChild( renderer.domElement );

  function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
  }

  animate();
}

function texture() {
  // camera & scene
  const elem = document.getElementById('texture');
  const camera = new THREE.PerspectiveCamera( 70, elem.offsetWidth / elem.offsetHeight, 0.01, 10 );
  camera.position.z = 1;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xffffff );

  // shape
  const geometry = new THREE.SphereGeometry( 0.5, 10, 5 );
  const material = new THREE.MeshBasicMaterial({
    // color: 0xF012BE,
    map: THREE.ImageUtils.loadTexture('/images/earth.jpeg')
  });
  const mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );

  // wireframe
  const wireframeGeometry = new THREE.WireframeGeometry( geometry );
  const wireframeMaterial = new THREE.LineBasicMaterial( {
    color: 0xffffff,
    transparent: true,
    opacity: 0.25
  } );
  const wireframe = new THREE.LineSegments( wireframeGeometry, wireframeMaterial );
  mesh.add( wireframe );

  // renderer
  const renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setSize( elem.offsetWidth, elem.offsetHeight );
  elem.appendChild( renderer.domElement );

  function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
  }

  animate();
}

function vertices() {
  // camera & scene
  const elem = document.getElementById('vertices');
  const camera = new THREE.PerspectiveCamera( 70, elem.offsetWidth / elem.offsetHeight, 0.01, 10 );
  camera.position.z = 1;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xffffff );

  // shape
  const geometry = new THREE.SphereGeometry( 0.5, 32, 16 );
  const material = new THREE.MeshBasicMaterial({
    // color: 0xF012BE,
    map: THREE.ImageUtils.loadTexture('/images/earth.jpeg')
  });
  const mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );

  // wireframe
  const wireframeGeometry = new THREE.WireframeGeometry( geometry );
  const wireframeMaterial = new THREE.LineBasicMaterial( {
    color: 0xffffff,
    transparent: true,
    opacity: 0.25
  } );
  const wireframe = new THREE.LineSegments( wireframeGeometry, wireframeMaterial );
  mesh.add( wireframe );

  // renderer
  const renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setSize( elem.offsetWidth, elem.offsetHeight );
  elem.appendChild( renderer.domElement );

  function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
  }

  animate();
}

function rotation() {
  // camera & scene
  const elem = document.getElementById('rotation');
  const camera = new THREE.PerspectiveCamera( 70, elem.offsetWidth / elem.offsetHeight, 0.01, 10 );
  camera.position.z = 1;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xffffff );

  // shape
  const geometry = new THREE.SphereGeometry( 0.5, 32, 32 );
  const material = new THREE.MeshBasicMaterial({
    // color: 0xF012BE,
    map: THREE.ImageUtils.loadTexture('/images/earth.jpeg')
  });
  const mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );

  // renderer
  const renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setSize( elem.offsetWidth, elem.offsetHeight );
  elem.appendChild( renderer.domElement );

  function animate() {
    requestAnimationFrame( animate );
    mesh.rotation.y += 0.004;
    renderer.render( scene, camera );
  }

  animate();
}

function rotateAxis() {
  // camera & scene
  const elem = document.getElementById('rotation-axis');
  const camera = new THREE.PerspectiveCamera( 70, elem.offsetWidth / elem.offsetHeight, 0.01, 10 );
  camera.position.z = 1;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xffffff );

  // shape
  const geometry = new THREE.SphereGeometry( 0.5, 32, 32 );
  const material = new THREE.MeshBasicMaterial({
    // color: 0xF012BE,
    map: THREE.ImageUtils.loadTexture('/images/earth.jpeg')
  });
  const earth = new THREE.Mesh( geometry, material );
  const radians = 23.4 * Math.PI / 180;
  const axis = new THREE.Vector3( Math.sin( radians ), Math.cos( radians ), 0 ).normalize();
  earth.geometry.applyMatrix( new THREE.Matrix4().makeRotationZ( - radians ));
  scene.add( earth );

  // renderer
  const renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setSize( elem.offsetWidth, elem.offsetHeight );
  elem.appendChild( renderer.domElement );

  function animate() {
    requestAnimationFrame( animate );
    earth.rotateOnAxis( axis, 0.004 );
    renderer.render( scene, camera );
  }

  animate();
}
