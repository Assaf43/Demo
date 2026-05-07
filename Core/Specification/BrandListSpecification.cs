using Core.Entities;

namespace Core.Specification;

public class BrandListSpecification : BaseSpecification<Product, string>
{
    public BrandListSpecification()
    {
        AddSelector(x => x.Brand);
        ApplyDistinct();
    }
}
