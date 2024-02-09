import "reflect-metadata";
import { EventCulture } from "../../domain/entities/eventCulture/EventCulture";
import { InMemoryEventCultureRepository } from "../adapters/inMemory/InMemoryEventCultureRepository";
import { DeleteEventCulture } from "../../usecase/eventCulture/DeleteEventCulture";
import { EventCultureError } from "../../domain/models/errors/EventCultureError";

describe("Unit - DeleteEventCulture", () => {
  let eventCultureRepo: InMemoryEventCultureRepository;
  let deleteEventCulture: DeleteEventCulture;
  let eventCulture: EventCulture;

  beforeAll(async () => {
    eventCultureRepo = new InMemoryEventCultureRepository(new Map());
    deleteEventCulture = new DeleteEventCulture(eventCultureRepo);
    eventCulture = EventCulture.create({
      note: "NOTE",
      plotId: "PLOT_ID",
    });
    await eventCultureRepo.save(eventCulture);
  });

  it("Should delete a eventCulture", async () => {
    const isDeleted = await deleteEventCulture.execute(eventCulture.props.id);
    expect(isDeleted).toEqual(true);
  });

  it("Should return a error if deleted plot failed", async () => {
    const result = deleteEventCulture.execute("FAKE_ID");
    expect(result).rejects.toThrow(EventCultureError.DeletedEventCultureFailed);
  });
});
