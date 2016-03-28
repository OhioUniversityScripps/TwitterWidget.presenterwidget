window.onload = function() {
  twitter_widget = new widgetFunctions();
  twitter_widget.init();
};

widgetFunctions = function() {
  var widgetFunctions = this;

  this.init = function() {
    // reload window every `sedna_config.Refresh` seconds
    refreshTime = parseInt(sedna_config.Refresh) * 1000;
    console.log("Refresh time " + refreshTime + " milliseconds");

    widgetFunctions.buildTwitterWidget("widgetContainer", sedna_config);

    setInterval(function(){
      widgetFunctions.buildTwitterWidget("widgetContainer", sedna_config);
    }, refreshTime);
  }

  this.buildTwitterWidget = function(parentDivId, options) {
    console.log("Loading or reloading...");
    twitterWidgetId = "twitterWidget";

    parentDiv = document.getElementById(parentDivId);
    twitterWidget = document.getElementById(twitterWidgetId);

    if (twitterWidget != null) {
      parentDiv.removeChild(twitterWidget);
    }

    // Create the <a class="twitter-timeline" data-dnt="true" href="widgetUURL" data-widget-id="WidgetID">Tweets from https://twitter.com/OU_MDIA/lists/recent-tweets</a>
    var widget = document.createElement("a");
    widget.setAttribute("class", "twitter-timeline");
    widget.setAttribute("id", twitterWidgetId);
    widget.setAttribute("href", options.WidgetURL);
    widget.setAttribute("data-dnt", "true");
    widget.setAttribute("data-widget-id", options.WidgetID);
    widget.setAttribute("data-theme", options.WidgetTheme);
    widget.setAttribute("data-link-color", options.WidgetLinkColor);
    widget.setAttribute("data-related", options.WidgetUsernames);
    widget.setAttribute("width", options.Width);
    widget.setAttribute("height", options.Height);
    widget.setAttribute("lang", "EN");

    widget.innerHTML = options.LinkText;

    parentDiv.appendChild(widget);
    twttr.widgets.load();
    console.log("Complete");
  }

}
