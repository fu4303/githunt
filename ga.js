// see https://www.shanebart.com/chrome-ext-analytics/
// for about how to make analytics.js work with chrome extension

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-134825122-1', 'auto');
ga('set', 'checkProtocolTask', function(){}); // // Removes failing protocol check.
// ga('send', 'pageview'); // we send pv in react-router hook now

var appVer = "4.10.0";
ga('set', 'dimension1', appVer);
