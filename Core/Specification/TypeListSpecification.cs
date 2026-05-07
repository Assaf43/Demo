using Core.Entities;

namespace Core.Specification;

public class TypeListSpecification : BaseSpecification<Product, string>
{
    public TypeListSpecification()
    {
        AddSelector(x => x.Type);
        ApplyDistinct();
    }
}
