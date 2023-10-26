import { CustomDialog } from "@/components/CustomDialog";
import { CustomTable } from "@/components/CustomTable";
import { Loading } from "@/components/Loading";
import { templateDelete, templatesGet } from "@/services/template.service";
import { setTemplates, useTemplatesStore } from "@/store/useTemplatesStore";
import { Box, Button } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { EmptyTemplates } from "./EmptyTemplates";
import { TemplatesModal } from "./TemplatesModal";
import { columns } from "./columns";
import { IconWithTooltip } from "@/components/IconWithTooltip";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import { truncate } from "@/utils/truncate";
import {
  showNotification,
  showNotificationError,
} from "@/utils/showNotification";
import { TemplatePreviewModal } from "./TemplatesPreviewModal";
import { useUsersStore } from "@/store/useUsersStore";
import { postDelete, postGetAll } from "@/services/post.service";


export const Templates = () => {
  // states
  const [loading, setLoading] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openPreviewModal, setOpenPreviewModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(
    {} as Template
  );
  const [hasTemplates, setHasTemplates] = useState(true);
  const [permissions, setPermissions] = useState({
    canCreate: true,
    canEdit: true,
    canDelete: true,
  });

  // hooks
  const { templates } = useTemplatesStore();
  const { currentUser } = useUsersStore();

  // const
  const rows = useMemo(() => {
    return templates.map((template, index) => {
      return {
        ...template,
        publicationDate: new Date(template.publicationDate!).toDateString(),
        id: `${template.id}_${index}`,
        content: (
          <div
            dangerouslySetInnerHTML={{
              __html: truncate(template.content, 70),
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
                setSelectedTemplate(template);
                setOpenPreviewModal(true);
              }}
            />
            {permissions.canEdit && (
              <IconWithTooltip
                tooltip="Editar"
                icon={<Edit className="icon" />}
                onClick={() => {
                  setSelectedTemplate(template);
                  setOpenModal(true);
                }}
              />
            )}
            {permissions.canDelete && (
              <IconWithTooltip
                tooltip="Borrar"
                icon={<Delete className="icon" />}
                onClick={() => {
                  setSelectedTemplate(template);
                  setOpenConfirmation(true);
                }}
              />
            )}
          </>
        ),
      };
    });
  }, [templates, setOpenConfirmation, permissions]);

  // functions
  const handleDeleteTemplate = async () => {
    try {
      await postDelete(selectedTemplate.id);

      const filteredTemplates = templates.filter(
        (template) => template.id !== selectedTemplate.id
      );

      setSelectedTemplate({} as Template);

      showNotification("¡Eliminado correctamente!", "success");

      setTemplates(filteredTemplates);
    } catch (err) {
      console.log("Delete template", err);

      showNotificationError();
    }
  };

  const getTemplates = useCallback(async () => {
    try {
      setLoading(true);
      const templatesResult = await postGetAll();

      setTemplates(templatesResult);

      setHasTemplates(templatesResult.length > 0);
    } catch (err) {
      console.log("Get templates", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // useEffect
  useEffect(() => {
    if (templates.length === 0 && hasTemplates) {
      getTemplates();
    }
  }, [getTemplates, hasTemplates, templates]);

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
        <EmptyTemplates
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

          <CustomTable rows={rows} columns={columns} showToolbar={false} />
        </>
      )}
      <CustomDialog
        open={openConfirmation}
        title="Aviso"
        description={`¿Estás seguro que quieres borrar ${selectedTemplate?.title}? Esto no se puede deshacer.`}
        onClose={() => setOpenConfirmation(false)}
        onCancel={() => setOpenConfirmation(false)}
        onConfirm={handleDeleteTemplate}
      />
      {selectedTemplate && (
        <TemplatesModal
          key={selectedTemplate?.id}
          open={openModal}
          onClose={() => {
            setOpenModal(false);
            setSelectedTemplate({} as Template);
          }}
          isEdit={!!selectedTemplate?.title}
          template={selectedTemplate}
        />
      )}
      <TemplatePreviewModal
        key={`preview_${selectedTemplate?.id}`}
        open={openPreviewModal}
        onClose={() => {
          setOpenPreviewModal(false);
          setSelectedTemplate({} as Template);
        }}
        template={selectedTemplate}
      />
    </Box>
  );
};