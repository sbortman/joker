package joker.search

class TwoFishesProxyController
{
  def grailsApplication
  def grailsLinkGenerator

  def index()
  {
    def twoFishesServer = grailsApplication.config.webAppConfig.twoFishes.serverUrl
    def twoFishesURL = grailsLinkGenerator.link( base: twoFishesServer, params: params ).toURL()

    render contentType: 'application/json', file: twoFishesURL.bytes
  }
}
