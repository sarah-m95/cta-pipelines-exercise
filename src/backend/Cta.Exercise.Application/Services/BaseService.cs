using Cta.Exercise.Application.Mappers;
using Cta.Exercise.Core.Dtos;
using Cta.Exercise.Core.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Cta.Exercise.Application.Services;

public class BaseService : IBaseService
{
    private readonly IBaseRepository _repository;

    public BaseService(IBaseRepository repository)
    {
        _repository = repository;
    }

    public ActionResult<U> Add<T, U>(T entity) where T : BaseCreateDto where U : BaseGetDto
    {
        var mappedEntity = BaseMapper.Map(entity);
        _repository.Add(mappedEntity);
        var dto = BaseMapper.Map(mappedEntity);

        return new OkObjectResult(dto);
    }

    public ActionResult<string> Delete(string id)
    {
        _repository.Delete(id);
        return new OkObjectResult(id);
    }

    public ActionResult<List<BaseGetDto>> GetAll()
    {
        return new OkObjectResult(_repository.GetAll());
    }

    public ActionResult<T?> GetById<T>(string id) where T : BaseGetDto
    {
        var entity = _repository.GetById(id);

        if (entity == null)
        {
            return new NotFoundResult();
        }

        var dto = BaseMapper.Map(entity) as T;

        return new OkObjectResult(dto);
    }

    public ActionResult<List<T?>> GetByType<T>() where T : BaseGetDto
    {
        var entities = _repository.GetByType(BaseGetDto.GetTypeByConstraint(typeof(T)));
        var dtos = entities.Select(x => BaseMapper.Map(x) as T).ToList();

        return new OkObjectResult(dtos);
    }

    public ActionResult<U> Update<T, U>(string id, T entity)
        where T : BaseUpdateDto
        where U : BaseGetDto
    {
        var mappedEntity = BaseMapper.Map(entity, id);
        _repository.Update(mappedEntity);
        var dto = BaseMapper.Map(mappedEntity);

        return new OkObjectResult(dto);
    }
}
