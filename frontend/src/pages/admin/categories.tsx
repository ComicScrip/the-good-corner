import AdminCategoryRow from "@/components/admin/AdminCategoryRow";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  CategoriesDocument,
  CategoriesQuery,
  Category,
  useCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
} from "@/graphql/generated/schema";
import { useApolloClient } from "@apollo/client";

export default function AdminCategories() {
  const { data, refetch } = useCategoriesQuery();
  const categories = data?.categories || [];
  const [deleteCategory] = useDeleteCategoryMutation();
  const [createCategory] = useCreateCategoryMutation();
  const client = useApolloClient();

  const handleDeleteCategory = async (id: number) => {
    try {
      await deleteCategory({ variables: { categoryId: id } });
      client.writeQuery<CategoriesQuery>({
        query: CategoriesDocument,
        data: {
          categories: categories.filter((cat) => cat.id !== id),
        },
      });
      //refetch();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AdminLayout title="gestion des categories - TGC">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const data = new FormData(form);
          const json = Object.fromEntries(data.entries());

          try {
            const res = await createCategory({
              variables: { data: json as any },
            });

            if (res.data?.createCategory)
              client.writeQuery<CategoriesQuery>({
                query: CategoriesDocument,
                data: {
                  categories: [{ ...res.data?.createCategory }, ...categories],
                },
              });
            form.reset();
          } catch (err) {
            console.error(err);
          }
        }}
      >
        <label htmlFor="name">
          Nouvelle Catégorie :{" "}
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

      {categories?.length !== 0 && (
        <table className="table mt-4">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nom</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((c) => (
              <AdminCategoryRow
                key={c.id}
                handleDeleteCategory={handleDeleteCategory}
                category={c}
              />
            ))}
          </tbody>
        </table>
      )}
    </AdminLayout>
  );
}
