import AdminTagRow from "@/components/admin/AdminTagRow";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  useCreateTagMutation,
  useDeleteTagMutation,
  useTagsQuery,
} from "@/graphql/generated/schema";

export default function AdminTags() {
  const { data, refetch } = useTagsQuery();
  const tags = data?.tags || [];
  const [deleteTagMutation] = useDeleteTagMutation();
  const [createTag] = useCreateTagMutation();

  const handleDeleteTag = async (id: number) => {
    try {
      await deleteTagMutation({ variables: { tagId: id } });
      refetch();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AdminLayout title="gestion des tags - TGC">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const data = new FormData(form);
          const json = Object.fromEntries(data.entries());

          try {
            await createTag({ variables: { data: json as any } });
            form.reset();
            refetch();
          } catch (err) {
            console.error(err);
          }
        }}
      >
        <label htmlFor="name">
          Nouveau Tag :{" "}
          <input
            type="text"
            id="name"
            name="name"
            className="input mr-2"
            required
          />
        </label>

        <button className="btn">Enregistrer</button>
      </form>

      {tags?.length !== 0 && (
        <table className="table mt-4">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nom</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tags?.map((c) => (
              <AdminTagRow
                key={c.id}
                handleDeleteTag={handleDeleteTag}
                tag={c}
              />
            ))}
          </tbody>
        </table>
      )}
    </AdminLayout>
  );
}
