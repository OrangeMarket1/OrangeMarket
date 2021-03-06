<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>


<!-- 헤더 -->
<jsp:include page="/include/header.jsp" flush="false">
	<jsp:param name="cssName" value="board" />
</jsp:include>
<!-- 헤더 -->

<!-- 페이지 wraper -->
<article class="pg-wrap pg-board-list">


	<!-- 타이틀 및 메뉴 -->
	<header class="sub-page-head">
		<div class="cont-inner">
			<h2 class="sub-page-title">고객센터</h2>
		</div>
	</header>


	<article class="board-wrap">
		<!-- container -->
		<div class="cont-inner">
			<nav class="board-menu-wrap">
				<ul class="board-menu">
					<li class="menu_li on"><a href="inquiry-list">문의내역</a></li>
					<li class="menu_li"><a href="report-list"><b>신고내역</b></a></li>
				</ul>
			</nav>

			<table class="board-table">
				<colgroup>
					<col width="10%" />
					<col width="15%" />
					<col width="*%" />
					<col width="10%" />
					<col width="15%" />
					<col width="12%" />
				</colgroup>

				<thead>
					<tr>
						<th>번호</th>
						<th>종류</th>
						<th>제목</th>
						<th>작성자</th>
						<th>작성일</th>
						<th>답변여부</th>
					</tr>
				</thead>
				<tbody>
				<c:set var="rownum" value="${page.rownum }"/>
				<c:choose>
				<c:when test="${page.total ne 0}">
				<c:forEach var="list" items="${list}">
					<tr>
						<td class="board-num">${rownum }</td>
						<td>${list.category}</td>
						<td class="board-tit"><a href="inquiry-detail?unq=${list.unq}">${list.title}</a></td>
						<td class="board-writer">${list.nikName}</td>
						<td>${list.rdate}</td>
						<td class="board-answer">${list.status}</td>
					</tr>
				<c:set var="rownum" value="${rownum-1 }"/>
				</c:forEach>	
				</c:when>
				<c:when test="${page.total eq 0}">
					<tr>
						<th colspan="6">고객센터에 문의하신 내역이 없습니다.</th>
					</tr>
				</c:when>
				</c:choose>
				</tbody>
			</table>

			<div class="btn1_div">
				<button type="button" class="btn"
					onclick="location='inquiry-write'">작성하기</button>
			</div>

			<article class="pager-wrap">
				<ul class="pager">
				<c:set var="before" value="${page.startPage-1}"/>
				<c:set var="next" value="${page.endPage+1}"/>
				<c:if test="${page.startPage != 1 }">
				<li><a href="inquiry-list?pageNo=${before}">&lt;</a></li>
				</c:if>	
					<c:forEach var="pageNo" begin="${page.startPage}" end="${page.endPage}">
						<c:choose>
						<c:when  test="${pageNo == page.pageNo }">
							<li class="on"><a href="inquiry-list?pageNo=${pageNo}">${pageNo}</a></li>
						</c:when>
						<c:when test="${pageNo != page.pageNo }">
							<li><a href="inquiry-list?pageNo=${pageNo}">${pageNo}</a></li>
						</c:when>
						</c:choose>
					</c:forEach>
				<c:if test="${page.endPage != page.totalPage }">
				<li><a href="inquiry-list?pageNo=${next}">&gt;</a></li>
				</c:if>		
				</ul>
			</article>

		</div>
		<!-- container end -->
	</article>


</article>
<!-- 페이지 wraper end -->

<!-- 푸터 -->
<jsp:include page="/include/footer.jsp" flush="false" />
<!-- 푸터 -->