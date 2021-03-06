grails.project.class.dir = "target/classes"
grails.project.test.class.dir = "target/test-classes"
grails.project.test.reports.dir = "target/test-reports"

grails.project.fork = [
    // configure settings for compilation JVM, note that if you alter the Groovy version forked compilation is required
    //  compile: [maxMemory: 256, minMemory: 64, debug: false, maxPerm: 256, daemon:true],

    // configure settings for the test-app JVM, uses the daemon by default
    test: [maxMemory: 768, minMemory: 64, debug: false, maxPerm: 256, daemon:true],
    // configure settings for the run-app JVM
    run: [maxMemory: 768, minMemory: 64, debug: false, maxPerm: 256, forkReserve:false],
    // configure settings for the run-war JVM
    war: [maxMemory: 768, minMemory: 64, debug: false, maxPerm: 256, forkReserve:false],
    // configure settings for the Console UI JVM
    console: [maxMemory: 768, minMemory: 64, debug: false, maxPerm: 256]
]

grails.project.dependency.resolver = "maven" // or ivy
grails.project.dependency.resolution = {
    // inherit Grails' default dependencies
    inherits("global") {
        // uncomment to disable ehcache
        // excludes 'ehcache'
    }
    log "warn" // log level of Ivy resolver, either 'error', 'warn', 'info', 'debug' or 'verbose'
    repositories {
        grailsCentral()
    mavenLocal(System.getenv('MAVEN_REPO'))
        mavenCentral()
        // uncomment the below to enable remote dependency resolution
        // from public Maven repositories
        //mavenRepo "http://repository.codehaus.org"
        //mavenRepo "http://download.java.net/maven/2/"
        //mavenRepo "http://repository.jboss.com/maven2/"
    }
    dependencies {
        // specify dependencies here under either 'build', 'compile', 'runtime', 'test' or 'provided' scopes eg.
        // runtime 'mysql:mysql-connector-java:5.1.27'
        compile 'org.webjars:openlayers:3.8.2'
        compile 'org.webjars:jquery:1.11.3'
        compile 'org.webjars:bootstrap:3.3.5'
        compile 'org.webjars.bower:devbridge-autocomplete:1.2.21'
        compile 'org.webjars:bootstrap-select:1.7.3-1'
        compile 'org.webjars:zeroclipboard:2.2.0'

    }

    plugins {
        build(":release:3.1.1",
              ":rest-client-builder:2.1.1") {
            export = false
        }

        compile ":asset-pipeline:2.5.1"
        compile ":es6to5-asset-pipeline:0.4"
    }
}

grails.plugin.location.mapWidget = '../../plugins/joker-map'
grails.plugin.location.jokerZoom = '../../plugins/joker-zoom'
