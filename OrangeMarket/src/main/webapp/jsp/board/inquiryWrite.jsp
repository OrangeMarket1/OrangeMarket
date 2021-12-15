<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>


<!-- 헤더 -->
<jsp:include page="/include/header.jsp" flush="false">
	<jsp:param name="cssName" value="board" />
</jsp:include>
<!-- 헤더 -->
<script>
	$(function(){
		$("#inquiryWrite").click(function(){
			
	  		if($("#title").val() == "" ) {
	  			alert("제목을 입력해주세요.");
	  			$("#title").focus();
	  			return false;
	  		}
	  		if($("#content").val() == "" ) {
	  			alert("내용을 입력해주세요.");
	  			$("#content").focus();
	  			return false;
	  		}
	  		
	  		var formdata = $("#frm").serialize();
	  		
	  		$.ajax({
	  			type : "post" ,
	  			url  : "inquiry-write-save",
	  			data : formdata,
	  			datatype : "text", //성공여부(ok)
	  			success : function(data) {
	  				if(data == "ok") {
	  					alert("저장성공");
	  					location="inquiry-list";
	  				} else {
	  					alert("저장실패");
	  				}
	  			},
	  			error : function() {
	  					alert("오류발생");
	  			}
	  		});
	  	});
		
	});

</script>
<!-- 페이지 wrapper -->
<article class="pg-wrap pg-board-write">

	<!-- 타이틀 및 메뉴 -->
	<header class="sub-page-head">
		<div class="cont-inner">
			<h2 class="sub-page-title">문의하기</h2>
		</div>
	</header>

	<article class="board-wrap">
		<!-- container -->
		<div class="cont-inner">


			<form id="frm">
				<table class="board-write-table">
					<tr>
						<td><select id="category" class="board-category-select">
								<option value="운영정책">운영정책</option>
								<option value="계정/인증" selected>계정/인증</option>
								<option value="구매/판매">구매/판매</option>
								<option value="거래품목">거래품목</option>
								<option value="이용제재">이용제재</option>
								<option value="동네생활">동네생활</option>
								<option value="이벤트/초대">이벤트/초대</option>
								<option value="지역광고">지역광고</option>
								<option value="기타">기타</option>
							</select> 
							<input type="text" id="title" class="board-title">
						</td>
					</tr>
					<tr>
						<td><textarea id="content" class="content"></textarea></td>
					</tr>


				</table>
					<input type="hidden" id="writer" value=20202020>
					<input type="hidden" id="nik_name" value="홍길동">
			</form>
			<div class="btn-div">
				<button class="btn" onclick="location='inquiry-list'">취소</button>
				<button class="btn btn-solid" id="inquiryWrite">등록</button>
			</div>

		</div>
		<!-- container end -->
	</article>


</article>
<!-- 페이지 wraper end -->

<!-- 푸터 -->
<jsp:include page="/include/footer.jsp" flush="false">
	<jsp:param name="jsName" value="board" />
</jsp:include>
<!-- 푸터 -->