import { CustomDialog } from "@/components/CustomDialog";
import { CustomTable } from "@/components/CustomTable";
import { Loading } from "@/components/Loading";
import { Box, Button } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { EmptyPosts } from "./EmptyPosts";
import { PostsModal } from "./PostsModal";
import { columns } from "./columns";
import { IconWithTooltip } from "@/components/IconWithTooltip";
import { Search, Edit, Visibility, Delete } from "@mui/icons-material";
import { truncate } from "@/utils/truncate";
import {
  showNotification,
  showNotificationError,
} from "@/utils/showNotification";
import { PostPreviewModal } from "./PostsPreviewModal";
import { useUsersStore } from "@/store/useUsersStore";
import { postDelete, postGetAll } from "@/services/post.service";
import { setPosts, usePostsStore } from "@/store/usePostSore";


export const Posts = () => {
  // states
  const [loading, setLoading] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openPreviewModal, setOpenPreviewModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<IPost>(
    {} as IPost
  );
  const [hasPosts, setHasPosts] = useState(true);
  const [permissions, setPermissions] = useState({
    canCreate: true,
    canEdit: true,
    canDelete: true,
  });

  const [searchTerm, setSearchTerm] = useState("");

  // hooks
  const { posts } = usePostsStore();
  const { currentUser } = useUsersStore();

  // const
  const rows = useMemo(() => {
    const filteredPosts = posts.filter((post) => {
      return (
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  
    return filteredPosts.map((post, index) => {
      return {
        ...post,
        publicationDate: new Date(post.publicationDate!).toDateString(),
        id: `${post.id}_${index}`,
        content: (
          <div
            dangerouslySetInnerHTML={{
              __html: truncate(post.content, 70),
            }}
            className="text-sm"
          />
        ),
         actions: (
          <>
            <IconWithTooltip
              tooltip="Ver"
              icon={<Visibility className="icon" />}
              onClick={() => {
                setSelectedPost(post);
                setOpenPreviewModal(true);
              }}
            />
            {permissions.canEdit && (
              <IconWithTooltip
                tooltip="Editar"
                icon={<Edit className="icon" />}
                onClick={() => {
                  setSelectedPost(post);
                  setOpenModal(true);
                }}
              />
            )}
            {permissions.canDelete && (
              <IconWithTooltip
                tooltip="Borrar"
                icon={<Delete className="icon" />}
                onClick={() => {
                  setSelectedPost(post);
                  setOpenConfirmation(true);
                }}
              />
            )}
          </>
        ),
      };
    });
  }, [posts, searchTerm]);
  

  // functions
  const handleDeletePost = async () => {
    try {
      await postDelete(selectedPost.id);

      const filteredPosts = posts.filter(
        (post) => post.id !== selectedPost.id
      );

      setSelectedPost({} as IPost);

      showNotification("¡Eliminado correctamente!", "success");

      setPosts(filteredPosts);
    } catch (err) {
      console.log("Delete post", err);

      showNotificationError();
    }
  };

  const getPosts = useCallback(async () => {
    try {
      setLoading(true);
      console.log('get post')
      const postsResult = await postGetAll();

      setPosts(postsResult);

      setHasPosts(postsResult.length > 0);
    } catch (err) {
      console.log("Get posts", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // useEffect
  useEffect(() => {
    if (posts.length === 0 && hasPosts) {
      getPosts();
    }
  }, [getPosts, hasPosts, posts]);

  return loading ? (
    <Loading />
  ) : (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      {rows.length === 0 ? (
        <EmptyPosts
          onClick={() => setOpenModal(true)}
          canCreate={permissions.canCreate}
        />
      ) : (
        <>
          
          {permissions?.canCreate && (
            <Button
              variant="outlined"
              sx={{
                maxWidth: 250,
                alignSelf: "flex-end",
                marginBottom: "32px",
              }}
              onClick={() => setOpenModal(true)}
            >
              Agregar nuevo
            </Button>
          )}
          <div className="flex gap-x-2 w-[45%] mb-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-[90%] p-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
              />
              <div className="absolute inset-y-0 left-2 flex items-center">
                <Search className="text-gray-400" />
              </div>
            </div>
            {/*<button
              onClick={() => setSearchTerm("")}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Limpiar
            </button>*/}
          </div>
          <CustomTable rows={rows} columns={columns} showToolbar={false} />
        </>
      )}
      <CustomDialog
        open={openConfirmation}
        title="Aviso"
        description={`¿Estás seguro que quieres borrar ${selectedPost?.title}? Esto no se puede deshacer.`}
        onClose={() => setOpenConfirmation(false)}
        onCancel={() => setOpenConfirmation(false)}
        onConfirm={handleDeletePost}
      />
      {selectedPost && (
        <PostsModal
          key={selectedPost?.id}
          open={openModal}
          onClose={() => {
            setSelectedPost({} as IPost);
            setOpenModal(false);
          }}
          isEdit={!!selectedPost?.title}
          post={selectedPost}
        />
      )}
      <PostPreviewModal
        key={`preview_${selectedPost?.id}`}
        open={openPreviewModal}
        onClose={() => {
          setOpenPreviewModal(false);
          setSelectedPost({} as IPost);
        }}
        post={selectedPost}
      />
    </Box>
  );
};
