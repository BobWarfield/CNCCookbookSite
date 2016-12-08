setTimeout(function(){
	var slid=getCookie("aug142015");
	if ((slid==null || slid=="") && (window.innerWidth > 1000)) {
    	$('.slideradcontainer').animate({'bottom': '0'});
	}
}, 2000);

function hideSlider()
{
	var ele = document.getElementById("slider");
	
	ele.style.display = "none";

	setCookie("aug142015","xxx",7);
}

function setCookie(c_name,value,exdays)
{
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name)
{
var i,x,y,ARRcookies=document.cookie.split(";");
for (i=0;i<ARRcookies.length;i++)
{
  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
  x=x.replace(/^\s+|\s+$/g,"");
  if (x==c_name)
    {
    return unescape(y);
    }
  }
}

