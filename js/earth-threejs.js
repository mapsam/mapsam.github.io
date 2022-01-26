window.onload = function() {
  // FIRST
  first();
  texture();
  vertices();
  rotation();
  moon();
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

function moon() {
    const elem = document.getElementById('moon');

    renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    renderer.setSize(elem.offsetWidth, elem.offsetHeight);
    elem.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(70, elem.offsetWidth / elem.offsetHeight, 1, 100);
    camera.position.set(0, -4, -1.5);

    loader = new THREE.TextureLoader();
    loader.setCrossOrigin("");

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    scene.add(camera);
    // window.onresize = resize;

    var ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    directionalLight.position.x = -0.75;
    directionalLight.position.y = -0.5;
    directionalLight.position.z = -1;
    scene.add( directionalLight );

    var axis = new THREE.AxesHelper(2);
    scene.add(axis);

    var material = new THREE.MeshPhongMaterial({color:'#f08080'});
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    mesh = new THREE.Mesh(geometry, material);

    var material2 = new THREE.MeshPhongMaterial({color:'#8080f0'});
    var geometry2 = new THREE.BoxGeometry( 1, 1, 1 );
    child = new THREE.Mesh(geometry2, material2);
    child.position.x = 1.5;

    mesh.add(child);
    scene.add(mesh);

    function animate() {
      child.position.set(0, 0, 0);
      child.rotateY(0.02)
      child.translateX(1.5);

      mesh.position.set(0, 0, 0);
      mesh.rotateZ(0.01);
      mesh.translateX(1.0);

      requestAnimationFrame(animate);
      render();
    }

    function render() {
      renderer.render(scene, camera);
    }

    animate();
}