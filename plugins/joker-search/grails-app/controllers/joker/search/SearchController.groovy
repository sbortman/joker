package joker.search

class SearchController
{
  def grailsApplication

  def index()
  {
    def webAppConfig = grailsApplication.config.webAppConfig

//    webAppConfig.twoFishes.markerIcon = asset.assetPath( webAppConfig.twoFishes.markerIcon as String )

    [webAppConfig: webAppConfig]
  }
}
