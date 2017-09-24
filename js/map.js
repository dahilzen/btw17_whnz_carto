function main() {

    var polygon;

    var map_object = L.map('map', {
        zoomControl: false,
        attributionControl: false,
        legends: false,
        layer_selector: false,
    }).setView([49.0267210, 9.1592710], 10);

    // Zoomfunktion komplett deaktivieren
    map_object.touchZoom.disable();
    map_object.doubleClickZoom.disable();
    map_object.scrollWheelZoom.disable();
    map_object.keyboard.disable();

    var sublayers = [];

    // Leeren TileLayer hinzufügen

    L.tileLayer('', {
        attribution: 'Recherche und Code: <a href="https://www.twitter.com/dahilzen">David Hilzendegen</a> | Daten: <a href="http://www.statistik-bw.de/">Statistisches Landesamt</a>'
    }).addTo(map_object);

    // cartodb createLayer
    cartodb.createLayer(map_object, 'https://dahilzen.carto.com/api/v2/viz/a7c0a54a-4a54-4773-982a-1dd8b80a0ef5/viz.json', {
            legends: false,
            cartodb_logo: false,
            mobile_layout: true,
            force_mobile: $(window).width() < 620,
            loaderControl: false,
        })
        .addTo(map_object)
        .on('done', function(layer) {
            // set interaction of the CartoDB layer (allow you to click on it)
            layer.setInteraction(true);

            // add sublayers & change the query for the first layer  
            var subLayerOptions = {
                sql: "SELECT * FROM result_wknz_1",
                cartocss: '#result_wknz_1{polygon-fill:#000;polygon-opacity:.8;line-color:#FFF;line-width:1;line-opacity:1}'
            }

            var sublayer = layer.getSubLayer(0);

            sublayer.infowindow.set('template', $('#infowindow_template').html());

            sublayer.set(subLayerOptions);

            sublayers.push(sublayer);

            //we define the queries that will be performed when we click on the buttons, by modifying the SQL of our layer
            var LayerActions = {
                sieger: function() {
                    sublayers[0].set({
                        sql: "SELECT * FROM result_wknz_1",
                        cartocss: '#result_wknz_1{polygon-fill:#000;polygon-opacity:.8;line-color:#FFF;line-width:1;line-opacity:1}'
                    });
                    return true;
                },
                cdu: function() {
                    sublayers[0].set({
                        sql: "SELECT * FROM result_wknz_1",
                        cartocss: '#result_wknz_1{polygon-fill:#FFFFB2;polygon-opacity:.8;line-color:#FFF;line-width:1;line-opacity:1}#result_wknz_1 [cdu_zweit<=41.6]{polygon-fill:#000;polygon-opacity:1,}#result_wknz_1 [cdu_zweit<=35.75]{polygon-fill:#000;polygon-opacity:.8,}#result_wknz_1 [cdu_zweit<=33.9]{polygon-fill:#000;polygon-opacity:.6,}#result_wknz_1 [cdu_zweit<=32.7]{polygon-fill:#000;polygon-opacity:.4,}#result_wknz_1 [cdu_zweit<=30.85]{polygon-fill:#000;polygon-opacity:.2,}'
                    });
                    return true;
                },
                spd: function() {
                    sublayers[0].set({
                        sql: "SELECT * FROM result_wknz_1",
                        cartocss: '#result_wknz_1{polygon-fill:#FFFFB2;polygon-opacity:.8;line-color:#FFF;line-width:.5;line-opacity:1}#result_wknz_1 [spd_zweit<=21]{polygon-fill:#eb0000;polygon-opacity:1}#result_wknz_1 [spd_zweit<=17.8]{polygon-fill:#eb0000;polygon-opacity:.8}#result_wknz_1 [spd_zweit<=17]{polygon-fill:#eb0000;polygon-opacity:.6}#result_wknz_1 [spd_zweit<=15.8]{polygon-fill:#eb0000;polygon-opacity:.4}#result_wknz_1 [spd_zweit<=14.5]{polygon-fill:#eb0000;polygon-opacity:.2}'
                    });
                    return true;
                },
                gruene: function() {
                    sublayers[0].set({
                        sql: "SELECT * FROM result_wknz_1",
                        cartocss: '#result_wknz_1{polygon-fill:#FFFFB2;polygon-opacity:.8;line-color:#FFF;line-width:.5;line-opacity:1}#result_wknz_1 [gruene_zweit<=15.9]{polygon-fill:#5cb813;polygon-opacity:1}#result_wknz_1 [gruene_zweit<=14.2]{polygon-fill:#5cb813;polygon-opacity:.8}#result_wknz_1 [gruene_zweit<=13]{polygon-fill:#5cb813;polygon-opacity:.6}#result_wknz_1 [gruene_zweit<=12]{polygon-fill:#5cb813;polygon-opacity:.4}#result_wknz_1 [gruene_zweit<=10.8]{polygon-fill:#5cb813;polygon-opacity:.2}'
                    });
                    return true;
                },
                linke: function() {
                    sublayers[0].set({
                        sql: "SELECT * FROM result_wknz_1",
                        cartocss: '#result_wknz_1{polygon-fill:#FFFFB2;polygon-opacity:.8;line-color:#FFF;line-width:.5;line-opacity:1}#result_wknz_1 [linke_zweit<=7.3]{polygon-fill:#540fc6;polygon-opacity:1}#result_wknz_1 [linke_zweit<=6.3]{polygon-fill:#540fc6;polygon-opacity:.8}#result_wknz_1 [linke_zweit<=5.5]{polygon-fill:#540fc6;polygon-opacity:.6}#result_wknz_1 [linke_zweit<=4.9]{polygon-fill:#540fc6;polygon-opacity:.4}#result_wknz_1 [linke_zweit<=4.3]{polygon-fill:#540fc6;polygon-opacity:.2}'
                    });
                    return true;
                },
                fdp: function() {
                    sublayers[0].set({
                        sql: "SELECT * FROM result_wknz_1",
                        cartocss: '#result_wknz_1{polygon-fill:#FFFFB2;polygon-opacity:.8;line-color:#FFF;line-width:.5;line-opacity:1}#result_wknz_1 [fdp_zweit<=19.8]{polygon-fill:#ecbd00;polygon-opacity:1}#result_wknz_1 [fdp_zweit<=16.5]{polygon-fill:#ecbd00;polygon-opacity:.8}#result_wknz_1 [fdp_zweit<=15]{polygon-fill:#ecbd00;polygon-opacity:.6}#result_wknz_1 [fdp_zweit<=14.2]{polygon-fill:#ecbd00;polygon-opacity:.4}#result_wknz_1 [fdp_zweit<=13.4]{polygon-fill:#ecbd00;polygon-opacity:.2}'
                    });
                    return true;
                },
                afd: function() {
                    sublayers[0].set({
                        sql: "SELECT * FROM result_wknz_1",
                        cartocss: '#result_wknz_1{polygon-fill:#FFFFB2;polygon-opacity:.8;line-color:#FFF;line-width:.5;line-opacity:1}#result_wknz_1 [fdp_zweit<=19.8]{polygon-fill:#ecbd00;polygon-opacity:1}#result_wknz_1 [fdp_zweit<=16.5]{polygon-fill:#ecbd00;polygon-opacity:.8}#result_wknz_1 [fdp_zweit<=15]{polygon-fill:#ecbd00;polygon-opacity:.6}#result_wknz_1 [fdp_zweit<=14.2]{polygon-fill:#ecbd00;polygon-opacity:.4}#result_wknz_1 [fdp_zweit<=13.4]{polygon-fill:#ecbd00;polygon-opacity:.2}'
                    });
                    return true;
                },
            }

            $('.button').click(function() {
                $('.button').removeClass('selected');
                $(this).addClass('selected');
                //this gets the id of the different buttons and calls to LayerActions which responds according to the selected id
                LayerActions[$(this).attr('id')]();
            });

            $('#selector').change(function() {
                LayerActions[$(this).val()]();
            });

            // when the CartoDB layer is clicked...
            layer.on('featureClick', function(e, latlng, pos, data) {
                // data1 stores the cartodb_id value of the selected polygon
                data1 = data.cartodb_id;

                // if Leaflet polygon is added on the map, remove it
                if (map_object.hasLayer(polygon)) {
                    map_object.removeLayer(polygon)
                    console.log("removed")
                }

                // use SQL API to extract the attribute values from the selected polygons
                var sql = new cartodb.SQL({
                    user: 'dahilzen'
                });
                // select the attribute tables to extract from CartoDB table
                sql.execute("SELECT ST_asGeoJSON(the_geom) as geom FROM result_wknz_1 WHERE cartodb_id IN (" + data1 + ")")
                    .done(function(data) {

                        var geom = data.rows[0].geom;
                        polygon = L.geoJson(JSON.parse(geom), {
                            style: {
                                color: "#fff", // color of stroke line
                                weight: 5, // width of stroke line
                                //fillColor: "blue", // define color of polygon
                                fill: true // set polygon
                            }

                        });
                        // add leaflet polygon on the map
                        map_object.addLayer(polygon);

                    });

            });

        });

}

window.onload = main;
