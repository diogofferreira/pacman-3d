//////////////////////////////////////////////////////////////////////////////
//
//  A class for instantiating light sources.
//
//  J. Madeira - Oct. 2015 + November 2017
//
//////////////////////////////////////////////////////////////////////////////

//----------------------------------------------------------------------------
//
//  Constructor
//

function LightSource( ) {
    
    // A new light source is always on
    
    this.isOn = true;
    
    // And is directional
    
    this.position = [ 0.0, 0.0, 1.0, 0.0 ];
    
    // White light
    
    this.intensity = [ 1.0, 1.0, 1.0 ];
    
    // Ambient component
    
    this.ambientIntensity = [ 0.2, 0.2, 0.2 ];
    
    // Animation controls
    
    this.rotXXOn = false;
    
    this.rotYYOn = false;
    
    this.rotZZOn = false;
    
    // Rotation angles    
    
    this.rotAngleXX = 0.0;
    
    this.rotAngleYY = 0.0;
    
    this.rotAngleZZ = 0.0;    
    
    // Rotation speed factor - Allow different speeds
    
    this. rotationSpeed = 1.0;
}

//----------------------------------------------------------------------------
//
//  Methods
//

LightSource.prototype.isOff = function() {
    
    return this.isOn == false;
}

LightSource.prototype.switchOn = function() {
    
    this.isOn = true;
}

LightSource.prototype.switchOff = function() {
    
    this.isOn = false;
}

LightSource.prototype.isDirectional = function() {
    
    return this.position[3] == 0.0;
}

LightSource.prototype.getPosition = function() {
    
    return this.position;
}

LightSource.prototype.setPosition = function( x, y, z, w ) {
    
    this.position[0] = x;
    
    this.position[1] = y;
    
    this.position[2] = z;
    
    this.position[3] = w;
}

LightSource.prototype.getIntensity = function() {
    
    return this.intensity;
}

LightSource.prototype.setIntensity = function( r, g, b ) {
    
    this.intensity[0] = r;
    
    this.intensity[1] = g;
    
    this.intensity[2] = b;
}

LightSource.prototype.getAmbIntensity = function() {
    
    return this.ambientIntensity;
}

LightSource.prototype.setAmbIntensity = function( r, g, b ) {
    
    this.ambientIntensity[0] = r;
    
    this.ambientIntensity[1] = g;
    
    this.ambientIntensity[2] = b;
}

LightSource.prototype.isRotZZOn = function() {
    
    return this.rotZZOn;
}

LightSource.prototype.switchRotZZOn = function() {
    
    this.rotZZOn = true;
}

LightSource.prototype.switchRotZZOff = function() {
    
    this.rotZZOn = false;
}

LightSource.prototype.getRotAngleZZ = function() {
    
    return this.rotAngleZZ;
}

LightSource.prototype.setRotAngleZZ = function( angle ) {
    
    this.rotAngleZZ = angle;
}

LightSource.prototype.getRotationSpeed = function() {
    
    return this.rotationSpeed;
}

LightSource.prototype.setRotationSpeed = function( s ) {
    
    this.rotationSpeed = s;
}

//----------------------------------------------------------------------------
//
//  Instantiating light sources
//

var lightSources = [];

// Yellow light (Sun)
var sunLight = new LightSource();
sunLight.setPosition( 0.0, 5.0, -1.0, 0.0 );
sunLight.setIntensity( 1.0, 1.0, 0.0 );
sunLight.setAmbIntensity( 0.8, 0.8, 0.0 );
lightSources.push(sunLight);

// Yellow light (Sun)
var sunLight1 = new LightSource();
sunLight1.setPosition( 0.0, 5.0, 2.0, 0.0 );
sunLight1.setIntensity( 1.0, 1.0, 0.0 );
sunLight1.setAmbIntensity( 0.8, 0.8, 0.0 );
lightSources.push(sunLight1);

// Super mode light (Blue)
var superModeLightBlue = new LightSource();
superModeLightBlue.setPosition( 0.0, 5.0, 0.0, 0.0 );
superModeLightBlue.setIntensity( 0.0, 0.0, 1.0 );
superModeLightBlue.setAmbIntensity( 0.0, 0.0, 0.8 );
superModeLightBlue.switchRotZZOn();
superModeLightBlue.setRotationSpeed(4.0);

// Super mode light (Red)
var superModeLightRed = new LightSource();
superModeLightRed.setPosition( 0.0, 5.0, 0.0, 0.0 );
superModeLightRed.setIntensity( 1.0, 0.0, 0.0 );
superModeLightRed.setAmbIntensity( 0.8, 0.0, 0.0 );

function switchSuperModeLight(enable) {

    if (enable) {
        // Enable super mode lights
        lightSources[0] = superModeLightRed;
        lightSources[1] = superModeLightBlue;
    } else {
        // Disable super mode lights
        lightSources = [];
        lightSources.push(sunLight);
        lightSources.push(sunLight1);
    }
}