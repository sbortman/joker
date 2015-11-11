class JokerZoomBootStrap
{

  def init = { servletContext ->

    if ( false )
    {
      def gulp = "gulp"

      def proc = gulp.execute( null, new File( "web-app" ) )

      proc.consumeProcessOutput( System.out, System.err )
    }

  }
  def destroy = {
  }
}
