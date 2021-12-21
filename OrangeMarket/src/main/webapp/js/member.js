/* trim  */
if (typeof String.trim == 'undefined') {
	String.prototype.trim = function() {
		return this.replace(/(^\s*)|(\s$)/g, '');
	};
}

/* 약관 */
var joinTermsForm = document.getElementById('formTerms');
if (joinTermsForm) {
	var btnFormNext = document.getElementById('btnTermsNext');
	btnFormNext.addEventListener('click', chkTerms);

	function chkTerms() {
		var frm = document.getElementById('formTerms');

		var locationTerm = frm.querySelector('input[name="agreeLocation"]');
		var mustTerms = frm.querySelectorAll('input[name="agreeMust"]');
		var mustLength = mustTerms.length;
		var cntMustChecked = 0;

		for (var i = 0; i < mustLength; i++) {
			if (mustTerms[i].checked == true) {
				cntMustChecked++;
			}
		}

		if (cntMustChecked < mustLength) {
			alert('필수 약관은 반드시 동의가 필요합니다.');

			return false;
		}

		location.href = 'join-form?l=' + locationTerm.checked;
	}
}


/* 회원가입 */
var joinForm = document.getElementById('joinForm');
if (joinForm) {
	var frm = joinForm;
	var btnJoinConfirm = document.getElementById('joinFormConfirm');
	var btnConfirmEmail = frm.querySelector('#btnConfirmEmail');
	var btnCheckArea = frm.querySelector('#btnCheckArea');
	var btnConfirmArea = frm.querySelector('#btnConfirmArea');

	/* 이름 검사 */
	frm.userName.addEventListener('blur', function() {
		chkName(frm)
	});

	/* 연락처 검사 */
	frm.tel.addEventListener('blur', function() {
		chkTel(frm)
	});

	/* 닉네임 검사 */
	frm.nickname.addEventListener('blur', function() {
		chkNik(frm)
	});

	/* 비밀번호 검사 */
	frm.password.addEventListener('blur', function() {
		chkPw1(frm)
	});

	/* 비밀번호 일치 검사 */
	frm.rePassword.addEventListener('blur', function() {
		chkPw2(frm)
	});

	/* 이메일 형식 */
	frm.email.addEventListener('blur', function() {
		chkEmail(frm)
	});

	/* 이메일 인증번호 */
	btnConfirmEmail.addEventListener('click', function() {
		chkEmailCode(frm)
	});

	/* 이메일 인증번호 검사 */
	frm.confirmEmail.addEventListener('blur', function() {
		chkEmailVerif(frm)
	});

	/* 주소 검색 */
	frm.addrArea.addEventListener('click', function() {
		srchArea(frm)
	});

	btnConfirmArea.addEventListener('click', function() {
		chkAreaVerif(frm);
	})


	/* 가입하기 버튼 누른 경우 */
	if (btnJoinConfirm) {
		btnJoinConfirm.addEventListener('click', chkJoinForm);
	}



	function chkJoinForm() {
		chkName(frm);
		chkTel(frm);
		chkNik(frm);
		chkPw1(frm);
		chkPw2(frm);
		chkEmail(frm);
	}


}

function chkName($target) {
	var frm = $target;
	var input = frm.userName;
	var inputTxt = input.value;
	var areaErrMsg = input.closest('td').querySelector('.form-err-msg');

	var regName = /^[가-힣]{2,}|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/;

	if (input.value === '') {
		var areaErrMsg = input.closest('td').querySelector('.form-err-msg');
		/*alert('이름을 입력해주세요');*/
		showFormErr(areaErrMsg, '이름을 입력해주세요');

		return false;
	}

	if (regName.test(inputTxt) === false) {
		showFormErr(areaErrMsg, '이름은 공백없이 한글 혹은 영문만 가능합니다.');

		return false;
	}
}

function chkTel($target) {
	var frm = $target;
	frm.telFlag.value = 'N';

	var input = frm.tel;
	var inputTxt = input.value;
	var areaErrMsg = input.closest('td').querySelector('.form-err-msg');

	if (inputTxt === '') {
		showFormErr(areaErrMsg, '연락처를 입력해주세요');

		return false;
	}

	var regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\']/gi;
	var regPhone = /^((01[1|6|7|8|9])[1-9][0-9]{6,7})$|(010[1-9][0-9]{7})$/;

	inputTxt = inputTxt.replace(regExp, '');

	if (inputTxt.substring(0, 2) != '01') {
		showFormErr(areaErrMsg, '연락처는 핸드폰 번호만 가능합니다.');

		return false;
	}

	if (regPhone.test(inputTxt) === false) {
		showFormErr(areaErrMsg, '연락처를 형식을 확인해주세요');

		return false;
	}

	if (regPhone.test(inputTxt) === true) {
		input.value = inputTxt;
	}

	var formData = 'tel=' + inputTxt;

	$.ajax({
		type: 'POST',
		url: 'check-usertel',
		data: formData,
		dataType: 'text',
		success: function(data) {
			console.log(data);
			if (data == 'exist') {
				showFormErr(areaErrMsg, '이미 존재하는 연락처입니다.');

				return false;
			} else if (data == 'ok') {
				frm.telFlag.value = 'Y';
			}
		},
		error: function() {
			showFormErr(areaErrMsg, '다시 시도해주세요');
		}
	});

	hideFormErr(areaErrMsg);
}

function chkNik($target) {
	var frm = $target;

	frm.nikFlag.value = 'N';

	var input = frm.nickname;
	var inputTxt = input.value;
	var nikStartChat = inputTxt.substring(0, 1);
	var areaErrMsg = input.closest('td').querySelector('.form-err-msg');

	if (inputTxt === '') {
		showFormErr(areaErrMsg, '닉네임 입력해주세요');

		return false;
	}

	/* 닉네임 첫 글자 확인 */
	if (inputTxt.length < 4) {
		var regStartKor = /^[가-힣ㄱ-ㅎ]/;
		var regStartEng = /^[a-zA-Z]/;

		/* 한글일 경우 */
		if (regStartKor.test(nikStartChat) === true) {
			var regKor = /^[가-힣ㄱ-ㅎ]{3,}/;

			if (regKor.test(inputTxt) === false) {
				showFormErr(areaErrMsg, '한글은 3자 이상 입력해야 합니다.');

				return false;
			}
		}

		/* 알파벳일 경우 */
		if (regStartEng.test(nikStartChat) === true) {
			var regEng = /^[a-zA-Z]{4,}/;

			if (regEng.test(inputTxt) === false) {
				showFormErr(areaErrMsg, '영문자는 4자 이상 입력해야 합니다.');

				return false;
			}
		}
	}

	/* 닉네임 확인 */
	var regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\']/gi;
	var regNickName = /^[가-힣ㄱ-ㅎa-zA-Z0-9.]{3,12}$/;

	inputTxt = inputTxt.replace(regExp, '');

	/* 닉네임 형식이 맞지 않은 경우 */
	if (regNickName.test(inputTxt) === false) {
		showFormErr(areaErrMsg, '한글, 영문, 숫자, 마침표만 사용 가능합니다 (3-12자)');

		return false;
	}

	var formData = {
		nickname: inputTxt
	};
	nikFlag = false;
	$.ajax({
		type: 'POST',
		url: 'check-nikname',
		data: formData,
		dataType: 'text',
		success: function(data) {
			console.log(data);
			if (data == 'exist') {
				showFormErr(areaErrMsg, '이미 존재하는 닉네임입니다.');

				return false;
			} else if (data == 'ok') {
				frm.nikFlag.value = 'Y';
			}
		},
		error: function() {
			showFormErr(areaErrMsg, '다시 시도해주세요');
		}
	});

	hideFormErr(areaErrMsg);
}

function chkPw1($target) {
	var frm = $target;

	frm.pwFlag.value = 'N';

	var input = frm.password;
	var inputTxt = input.value;
	var areaErrMsg = input.closest('td').querySelector('.form-err-msg');

	if (inputTxt == '') {
		showFormErr(areaErrMsg, '비밀번호를 입력해주세요');

		return false;
	}

	var formData = {
		password: inputTxt
	};
	$.ajax({
		type: 'POST',
		url: 'check-password',
		data: formData,
		dataType: 'text',
		success: function(data) {
			console.log(data);
			if (data == 'err') {
				showFormErr(areaErrMsg, '문자, 숫자, 기호  3종류 조합으로 해주세요 (8-20 글자)');

				return false;
			}
		},
		error: function() {
			showFormErr(areaErrMsg, '다시 시도해주세요');
			input.value = '';
		}
	});

	hideFormErr(areaErrMsg);
}

function chkPw2($target) {

	var frm = $target;
	var input = frm.rePassword;
	var inputTxt = input.value;
	var areaErrMsg = input.closest('td').querySelector('.form-err-msg');

	if (inputTxt == '') {
		showFormErr(areaErrMsg, '비밀번호를 입력해주세요');

		return false;
	}

	if (inputTxt != frm.password.value) {
		showFormErr(areaErrMsg, '비밀번호가 일치하지 않습니다.');

		return false;
	}

	var formData = 'password=' + inputTxt;
	$.ajax({
		type: 'POST',
		url: 'check-password',
		data: formData,
		dataType: 'text',
		success: function(data) {
			console.log(data);
			if (data == 'err') {
				showFormErr(areaErrMsg, '문자, 숫자, 기호  3종류 조합으로 해주세요 (8-20 글자)');

				return false;
			} else if (data == 'ok') {
				frm.pwFlag.value = 'Y';
			}
		},
		error: function() {
			showFormErr(areaErrMsg, '다시 시도해주세요');
			input.value = '';
		}
	});

	hideFormErr(areaErrMsg);
}

function chkEmail($target) {

	var frm = $target;
	var input = frm.email;
	var inputTxt = input.value;
	var areaErrMsg = input.closest('td').querySelector('.form-err-msg');

	btnConfirmEmail.disabled = true;

	var regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

	if (inputTxt == '') {
		showFormErr(areaErrMsg, '이메일을 입력해주세요');

		return false;
	}

	if (regEmail.test(inputTxt) === false) {
		showFormErr(areaErrMsg, '이메일 형식을 확인해주세요');

		return false;
	}


	var formData = 'email=' + frm.email.value;
	$.ajax({
		type: 'POST',
		url: 'check-email',
		data: formData,
		dataType: 'text',
		success: function(data) {
			if (data == 'exist') {
				showFormErr(areaErrMsg, '이미 존재하는 이메일입니다.');
			} else if (data == 'ok') {
				btnConfirmEmail.disabled = false;
			}
		},
		error: function() {
			showFormErr(areaErrMsg, '다시 시도해주세요');
			input.value = '';
		}
	});

	hideFormErr(areaErrMsg);
}

function chkEmailCode($target) {

	var frm = $target;

	console.log('chkEmailCode frm : ' + frm);
	console.log('chkEmailCode frm.email.value : ' + frm.email.value);

	var formData = 'email=' + frm.email.value;
	frm.confirmEmail.readOnly = false;

	$.ajax({
		type: 'POST',
		url: 'send-verif-email',
		data: formData,
		dataType: 'text',
		success: function(data) {
			console.log(data);
		},
		error: function() {
			showFormErr(areaErrMsg, '다시 시도해주세요');
			input.value = '';
		}
	});
}

function chkEmailVerif($target) {

	var frm = $target;
	var input = frm.confirmEmail;
	var inputTxt = input.value;
	var areaErrMsg = input.closest('td').querySelector('.form-err-msg');

	var regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\']/gi;

	if (inputTxt == '') {
		showFormErr(areaErrMsg, '인증번호를 입력해주세요');

		return false;
	}

	var formData = {
		'email': frm.email.value,
		'emailCode': inputTxt
	};
	$.ajax({
		type: 'POST',
		url: 'check-verifcode',
		data: formData,
		dataType: 'text',
		success: function(data) {
			if (data == 'ok') {
				frm.emailFlag.value = 'Y';
				input.style.display = 'none';
			} else if (data == 'err') {
				showFormErr(areaErrMsg, '인증번호를 다시 확인해주세요');
			}
		},
		error: function() {
			showFormErr(areaErrMsg, '다시 시도해주세요');
			input.value = '';
		}
	});

	hideFormErr(areaErrMsg);
}

function srchArea($target) {

	var frm = $target;
	var input = frm.addrArea;
	var inputTxt = input.value;

	var width = 500; //팝업의 너비
	var height = 600; //팝업의 높이
	new daum.Postcode({
		width: width, //생성자에 크기 값을 명시적으로 지정해야 합니다.
		height: height,
		oncomplete: function(data) {

			var roadAddr = data.roadAddress; // 도로명 주소 변수
			var jibunAddr = data.jibunAddress; // 지번 주소 변수

			input.value = data.zonecode // 기본주소
			/* 검색 결과에서 첫줄에 나오는 주소, 검색어의 타입(지번/도로명)에 따라 달라집니다. */

			if (roadAddr != '') {
				input.value = roadAddr;
			} else if (jibunAddr != '') {
				input.value = jibunAddr;
			}

			console.log("input.value" + input.value);

		}
	}).open({
		popupKey: 'srchAddrArea',
		left: (window.screen.width / 2) - (width / 2),
		top: (window.screen.height / 2) - (height / 2),
		q: inputTxt
	});

}

function chkAreaVerif($target) {

	var frm = $target;
	var srchAreaCode = '';

	console.log(frm.addrArea.value);

	// 입력한 주소의 정보 가져오기
	$.ajax({
		url: 'https://dapi.kakao.com/v2/local/search/address.json?query=' + frm.addrArea.value,
		headers: {
			'Authorization': 'KakaoAK 78ca57b17929b0d8592c839763406d9a'
		},
		type: 'GET',
		success: function(srchData) {
			console.log("key data" + JSON.stringify(srchData.documents[0].address.b_code));
			srchAreaCode = srchData.documents[0].address.b_code;
		},
		error: function(e) {
			console.log(e);
		}
	});
	
	console.log('srchAreaCode ==> ' + srchAreaCode);

	// HTML5의 geolocation으로 사용할 수 있는지 확인합니다 
	if (navigator.geolocation) {
		// GeoLocation을 이용해서 접속 위치를 얻어옵니다
		navigator.geolocation.getCurrentPosition(function(position) {
			var lat = position.coords.latitude, // 위도
				lon = position.coords.longitude; // 경도

			var myPosition = new kakao.maps.LatLng(lat, lon) // geolocation으로 얻어온 좌표
			var myAreaCode = '';

			// 현재 위치의 정보가져오기
			$.ajax({
				url: 'https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=' + lon + '&y=' + lat,
				headers: {
					'Authorization': 'KakaoAK 78ca57b17929b0d8592c839763406d9a'
				},
				type: 'GET',
				success: function(currData) {
					console.log("key data" + JSON.stringify(currData.documents[0]));
					myAreaCode = currData.documents[0].code;
					
					console.log('srchAreaCode ==> ' + srchAreaCode + ', myAreaCode ==> ' + myAreaCode)

					if (srchAreaCode == myAreaCode) {
						alert('일치');
					} else {
						showFormErr(areaErrMsg, '현재위치와 일치하지 않습니다');
					}
				},
				error: function(e) {
					console.log(e);
				}
			});


		});
	} else { // HTML5의 GeoLocation을 사용할 수 없을때 
		var myPosition = new kakao.maps.LatLng(37.566826, 126.9786567)
		alert('현재 위치를 찾을 수 없습니다!');
	}

}



function showFormErr($obj, msg) {
	$obj.innerText = msg;
}

function hideFormErr($obj) {
	$obj.innerText = '';
}