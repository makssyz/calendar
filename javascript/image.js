function uploadImage(id, imagePicker){
	if(imagePicker.files && imagePicker.files[0]){
		const fr = new FileReader();
		fr.readAsDataURL(imagePicker.files[0]);
		fr.onload = (function (data) {
			addImageToEvent(url, user, id, {imagedata: fr.result});
		}
	}
}