var config = {
	package_id: "95475",
	service_url: "https://services.inplayer.com",
};

// CREATE ASSET
function createItemElement(assetId, assetPhoto, assetTitle, assetDesc) {
	var output = `<div class="package-item"><div class="content" style="background-image:url(${assetPhoto})"><a href="./item.html?id=${assetId}" class="overlay-link"></a></div><div class="item-label"><div class="name">${assetTitle}</div></div><div class="description">${assetDesc}</div></div>`;
	return output;
}

$(function () {
	$(".inplayer-paywall-logout").parent().hide();
	paywall.on("authenticated", function () {
		$(".inplayer-paywall-login").parent().hide();
		$(".inplayer-paywall-logout").parent().show();
	});

	paywall.on("logout", function () {
		location.reload();
	});
});

// TAKE ASSETS INFO
$.get(
	config.service_url + `/items/packages/${config.package_id}/items?limit=500`,
	(response) => {
		// console.log($('#package-title-' + package))

		var output = "";
		// console.log(packageNumber)

		for (var i = 0; i < response.collection.length; i++) {
			var asset = response.collection[i];
			// console.log(asset.metahash.preview_title)

			var assetId = asset.id;
			var assetPhoto = asset.metahash.paywall_cover_photo;
			var assetTitle = asset.title;
			var assetDesc = asset.metahash.preview_description;
			output += createItemElement(assetId, assetPhoto, assetTitle, assetDesc);

			// console.log(`title is: "${assetTitle}" and desc is: "${assetDesc}"`)

			document.getElementById(
				`package-items-${config.package_id}`
			).innerHTML = output;
		} // for
	}
); // get items
