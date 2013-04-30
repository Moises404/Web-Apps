import processing.video.*;

Movie m;
float w;

void setup()
{
    size( 640, 480 );
    
    m = new Movie( this, "marbles.mov" );
    m.loop();
}

void draw()
{
    background( 0 );
    image( m, 0, 0, width, height );
    
    fill( 0 );
    noStroke();
    rect( 0, 0, w, 10 );
}

void movieEvent( Movie m )
{
    m.read();
    w = map( m.time(), 0, m.duration(), 0, width );
}

void mousePressed()
{
    float x = map( mouseX, 0, width, 0, m.duration() );
    m.jump( x );
}
