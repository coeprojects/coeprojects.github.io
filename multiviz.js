        // The vizzes to eventually be loaded
        var viz_info = {
            "wb_1": "WeeklyProjectStatusandSummary/summarypage",
            "wb_2": "WeeklyProjectStatusandSummary/projectstatus",
            "wb_3": "WeeklyProjectStatusandSummary/previousupdates"
        };

        var site_content_url = 'ProjectManagement';
        var server = 'https://tableau.coenterprise.com';
        function build_viz_url(server, site_content_url, view_content_url) {
            var full_url;
            if (site_content_url.toLowerCase() == 'default') {
                full_url = server + "/views/" + view_content_url;
            }
            else {
                full_url = server + "/t/" + site_content_url + "/views/" + view_content_url;
            }
            return full_url;
        }

        // Hold the actual Viz objects
        var vizzes = {};

        var workbook_name;
        var view_name;

        var current_viz;
        var book;
        // { viz_name : int }
        // Cover_div always stays at
        var viz_div_z_index = {
            "cover_div": 2
        };

        var options = {
            // This function runs after the viz is loaded, so all additional API calls should generate from there
            hideTabs: true,
            hideToolbar: true
        };

        function assign_viz_div_z_indexes() {
            // Hide all other Viz Containers
            $.each(viz_div_z_index, function (key, value) {
                // $("#" + key).hide();
                $("#" + key).css("z-index", value);
                if (value == 1) {
                    $("#" + key).hide();
                }
                else {
                    $("#" + key).show();
                }
            });
        }
        function switch_dashboard(dash_name) {
            var viz_div_options = {
                "height": 800
            }

            // Setting all other viz div z-index potentials down to 1
            $.each(vizzes, function (key, value) {

                // cover_div must remain at z-index = 2 so that a larger underlying viz never shows in background
                if ((key != dash_name) && (key != 'cover_div')) {
                    //$("#" + key).hide();
                    viz_div_z_index[key] = 1;
                }
            });

            // Check if viz has been initiated, if not, create it
            if (vizzes[dash_name]) {
                current_viz = vizzes[dash_name];
                //$("#" + dash_name).show();
                // Set the current_viz index high;
                viz_div_z_index[dash_name] = 3;
                //$("#" + dash_name).css("z-index",2); 
                assign_viz_div_z_indexes();
            }
            // Create if not initiated
            else {

                console.log('Going to make the viz');
                // Container viz must not be hidden
                new_div = document.createElement("div");
                new_div.id = dash_name;
                new_div.className = 'vizContainer';
                $(new_div).css('z-index', 1);
                viz_holder = document.body;
                viz_holder.appendChild(new_div);
                $("#" + dash_name).show();
                // Set the eventual index high
                viz_div_z_index[dash_name] = 3;
                // Initialize the viz
                vizzes[dash_name] = new tableau.Viz(
                    document.getElementById(dash_name),
                    build_viz_url(server, site_content_url, viz_info[dash_name]),
                    options
                );
                active_viz = vizzes[dash_name];
            }
        }

        function completeLoad(e) {
            // Reassign all the z-index to show the right one
            assign_viz_div_z_indexes();

            book = active_viz.getWorkbook();
            v = e.getViz();
            wb = v.getWorkbook();
        }