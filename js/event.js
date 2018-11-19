let storage= firebase.storage();
  let progress= document.getElementById('UploadProgress');
  let upload=document.getElementById('dok');
  let downloadButton= document.getElementById('download');
  let list= document.getElementById('uploaded');
  let percentPro= document.getElementById('percentPro');

  //const downloadRef= storage.ref('modul/rudal.txt');
  
  upload.addEventListener('change',function(e){

  	let file= e.target.files[0];
  	let storageRef= storage.ref('modul/' + file.name);
	let uploadTask= storageRef.put(file);


	uploadTask.on('state_changed', loadUpload, errUpload, successUpload);

	function loadUpload(data){
		let percent = (data.bytesTransferred / data.totalBytes)*100;
		percentPro.innerHTML= percent;
		progress.value= percent;
		
	}

	 function errUpload(err){
	 	console.log(err);
	 	alert('Error Uploading files');
	 }

	 function successUpload(data){
	 	console.log(data);
	 	list.innerHTML = file.name+' ';
	 	list.value= file.name;
	 	alert(file.name+' Uploaded');
	 	storage.ref('modul/'+file.name).getDownloadURL().then(function(url){
	 		console.log(url);
  			document.getElementById('link').innerHTML="<a href='"+url+"' class='btn btn-primary'target='_blank'>Download</a>";
	 	})
	 }

  });
  // downloadButton.addEventListener('click',function(){
  // 	downloadRef.getDownloadURL().then(function(url){
  // 		console.log(url);
  // 		document.getElementById('link').innerHTML="<a href='"+url+"'>Download</a>";
  // 		console.log('Berhasil Download');
  // 	})
  // })
