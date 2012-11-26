            function save(form_post_url, editorText) {
                var xmlhttp = null;
                if (window.XMLHttpRequest)
                {// code for IE7+, Firefox, Chrome, Opera, Safari
                    xmlhttp = new XMLHttpRequest();
                }
                else
                {// code for IE6, IE5
                    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                }

                xmlhttp.onreadystatechange=function()
                {
                    var rs = xmlhttp.readyState == 4
                    var hs = xmlhttp.status == 200
                    if (rs && hs)
                    {
                        var response = xmlhttp.responseText;

                        if( response == "OK" ) {
                            document.getElementById("feedback").src="/~/ace/tick.png";
                            document.getElementById("bannerMsg").style.visibility = 'hidden';
                            document.getElementById("bannerMsg").style.height = 0;
                        } else {
                            document.getElementById("feedback").src="/~/ace/error.png";
                        }

                    }
                }

                var params = "resourceText="+encodeURIComponent(editorText);
                var params = params.replace(/%20/g, '+');

                xmlhttp.open("POST", form_post_url, true);
                xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xmlhttp.send(params);

            }