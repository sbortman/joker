class UrlMappings
{

  static mappings = {
    "/$controller/$action?/$id?(.$format)?" {
      constraints {
        // apply constraints here
      }
    }

    "/"( controller: 'search', view: "index" )
    "500"( view: '/error' )
  }
}
