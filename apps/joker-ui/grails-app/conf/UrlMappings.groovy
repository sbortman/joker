class UrlMappings
{

  static mappings = {
    "/$controller/$action?/$id?(.$format)?" {
      constraints {
        // apply constraints here
      }
    }

    "/"( redirect: '/search/index' )
    "500"( view: '/error' )
  }
}
