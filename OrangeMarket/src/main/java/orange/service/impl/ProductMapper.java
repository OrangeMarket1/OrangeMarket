package orange.service.impl;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import orange.service.MemberVO;
import orange.service.ProductSubVO;
import orange.service.ProductVO;

@Mapper("productMapper")
public interface ProductMapper {

	int insertProduct(ProductVO vo);
	ProductVO selectProductAddr(ProductVO vo);
	
	List<?> selectProductList(ProductVO vo);
	List<?> selectProductCategoryList(ProductVO vo);
	String selectProCategory(ProductVO vo);

	ProductVO selectProductDetail(ProductVO vo);

	ProductVO selectProductModify(ProductVO vo);
	

	

}
