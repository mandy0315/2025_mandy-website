interface Note {
  title: string;
  path: string;
  categories: string[];
  image: string;
  description: string;
  date: string;
}

type SortOrder = "ASC" | "DESC";
export const useNote = () => {
  const limitCount = 9;
  const isLoading = useState<boolean>("loading_notes", () => false);
  const notes = useState<{
    list: Note[];
    totalNotes: number;
    currentPage?: number;
    totalPage?: number;
  }>("notes", () => {
    return {
      list: [],
      totalNotes: 0,
    };
  });

  const validateAndFormatSortOrder = (sort: string) => {
    if (["desc", "asc"].includes(sort)) {
      return sort.toUpperCase() as SortOrder;
    } else {
      showError({
        statusCode: 404,
        statusMessage: "Page Not Found",
      });
    }
  };

  const setNotes = async (sort: SortOrder = "DESC") => {
    try {
      const data = await queryCollection("notes")
        .order("date", sort)
        .select("title", "path", "categories", "image", "description", "date")
        .all();

      notes.value.list = data;
      notes.value.totalNotes = data.length;
    } catch (error) {
      console.error("取得文章錯誤", error);
    }
  };

  const filteredNotesInCategory = (category: string) => {
    const list = notes.value.list;
    if (list.length === 0) return;

    const notesInCategory = notes.value.list.filter((note) =>
      note.categories.includes(category)
    );

    if (notesInCategory && notesInCategory.length > 0) {
      notes.value.list = notesInCategory;
      notes.value.totalNotes = notesInCategory.length;
    }
  };

  const setPaginateNotes = (limitCount = 1, currentPage = 1) => {
    const list = notes.value.list;
    if (list.length === 0) return;

    // 一頁限有幾筆文章
    const totalPage = Math.ceil(list.length / limitCount);

    // 頁面的文章
    const notesInPage = list.slice(
      (currentPage - 1) * limitCount,
      currentPage * limitCount
    );

    notes.value = {
      list: notesInPage,
      currentPage,
      totalPage,
      totalNotes: list.length,
    };
  };

  const updateNotes = async (currentPage = 1, currentSort = "desc") => {
    isLoading.value = true;
    const sort = validateAndFormatSortOrder(currentSort);

    await setNotes(sort || "DESC");

    setPaginateNotes(limitCount, currentPage);
    isLoading.value = false;
  };

  const updateNotesInCategory = async (
    currentPage = 1,
    currentCategory = ""
  ) => {
    isLoading.value = true;
    await setNotes();
    filteredNotesInCategory(currentCategory);
    setPaginateNotes(limitCount, currentPage);
    isLoading.value = false;
  };

  return {
    updateNotes,
    notes,
    isLoading,
    updateNotesInCategory,
  };
};
