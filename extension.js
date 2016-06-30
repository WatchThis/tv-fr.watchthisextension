var re = /source:\s+"(http.*?m3u8.*?)"/;

function streaming_hub_content(content) {
    var url = "http://www.streaming-hub.com/" + content + "-live/";
    return function() {
        return fetch(url).then(function (resp) {
            return resp.text();
        }).then(function (body) {
            var m = re.exec(body);
            return m && m.length > 1 ? m[1] : null;
        });
    };
}

function channels(req) {
    var data = [
        ["Arte", "arte.png", "http://streaming-hub.com/stream/arte.m3u8"],
        ["D17", "d17.png", "d17"],
        ["D8", "d8.png", "d8"],
        ["Euronews", "euronews.png", "http://streaming-hub.com/stream/euronews.m3u8"],
        ["France 2", "france2.png", "france-2"],
        ["France 24", "france24.png", "http://streaming-hub.com/stream/france-24.m3u8"],
        ["France 3", "france3.png", "france-3"],
        ["France 4", "france4.png", "france-4"],
        ["France 5", "france5.png", "france-5"],
        ["France Ô", "franceo.png", "france-o"],
        ["Gulli", "gulli.png", "http://streaming-hub.com/stream/gulli.m3u8"],
        ["L´équipe 21", "lequipe21.png", "http://streaming-hub.com/stream/lequipe21.m3u8"],
        ["M6", "m6.png", "m6"],
        ["RMC Découverte", "rmcdecouverte.png", "http://streaming-hub.com/stream/rmc.m3u8"],
        ["TF1", "tf1.png", "tf1"],
        ["W9", "w9.png", "w9"],

    ];
    var channels = [];
    for (var ii = 0; ii < data.length; ii++) {
        var item = data[ii];
        var content = item[2];
        var content_url;
        if (content.indexOf("://") >= 0) {
            content_url = content;
        } else {
            content_url = streaming_hub_content(content);
        }
        channels.push({
            title: item[0],
            country: "fr",
            image: item[1],
            background_color: "#fff",
            content_url: content_url,
        });
    }
    req.reply(channels);
}
